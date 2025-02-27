-- Crear tabla de organizaciones
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de relación entre usuarios y organizaciones
CREATE TABLE IF NOT EXISTS public.user_organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, organization_id)
);

-- Crear tabla de permisos de usuario
CREATE TABLE IF NOT EXISTS public.user_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    permission_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, organization_id, permission_name)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON public.user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_organizations_organization_id ON public.user_organizations(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON public.user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_permissions_organization_id ON public.user_permissions(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_permissions_permission_name ON public.user_permissions(permission_name);

-- Crear políticas de seguridad RLS (Row Level Security)

-- Habilitar RLS en las tablas
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Políticas para organizaciones
CREATE POLICY "Usuarios pueden ver sus organizaciones" ON public.organizations
    FOR SELECT
    USING (
        id IN (
            SELECT organization_id FROM public.user_organizations
            WHERE user_id = auth.uid() AND is_active = TRUE
        )
    );

CREATE POLICY "Administradores pueden crear organizaciones" ON public.organizations
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND profile_type = 'admin'
        )
    );

CREATE POLICY "Propietarios pueden actualizar sus organizaciones" ON public.organizations
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_organizations
            WHERE user_id = auth.uid() AND organization_id = id AND role = 'owner' AND is_active = TRUE
        )
    );

-- Políticas para user_organizations
CREATE POLICY "Usuarios pueden ver sus relaciones con organizaciones" ON public.user_organizations
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        organization_id IN (
            SELECT organization_id FROM public.user_organizations
            WHERE user_id = auth.uid() AND (role = 'owner' OR role = 'admin') AND is_active = TRUE
        )
    );

CREATE POLICY "Propietarios pueden gestionar miembros de la organización" ON public.user_organizations
    FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM public.user_organizations
            WHERE user_id = auth.uid() AND role = 'owner' AND is_active = TRUE
        )
    );

-- Políticas para user_permissions
CREATE POLICY "Usuarios pueden ver sus permisos" ON public.user_permissions
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        organization_id IN (
            SELECT organization_id FROM public.user_organizations
            WHERE user_id = auth.uid() AND (role = 'owner' OR role = 'admin') AND is_active = TRUE
        )
    );

CREATE POLICY "Propietarios y administradores pueden gestionar permisos" ON public.user_permissions
    FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM public.user_organizations
            WHERE user_id = auth.uid() AND (role = 'owner' OR role = 'admin') AND is_active = TRUE
        )
    );

-- Función para crear una organización personal automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.create_personal_organization()
RETURNS TRIGGER AS $$
DECLARE
    org_id UUID;
BEGIN
    -- Crear organización personal
    INSERT INTO public.organizations (name, type, status)
    VALUES (NEW.email || ' Personal', 'personal', 'active')
    RETURNING id INTO org_id;
    
    -- Asignar usuario como propietario
    INSERT INTO public.user_organizations (user_id, organization_id, role)
    VALUES (NEW.id, org_id, 'owner');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear organización personal al registrarse
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.create_personal_organization();
