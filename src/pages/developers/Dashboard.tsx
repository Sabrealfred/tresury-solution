import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, FileCode, Key, Lock, BarChart, Terminal, BookOpen, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function DeveloperPortal() {
  // Datos de ejemplo para las APIs
  const apiEndpoints = [
    {
      name: "Accounts API",
      description: "Acceso a información de cuentas y saldos",
      status: "active",
      version: "v2.1",
      requests: 1243,
      lastUsed: "Hace 2 horas"
    },
    {
      name: "Payments API",
      description: "Procesamiento de pagos y transferencias",
      status: "active",
      version: "v1.8",
      requests: 856,
      lastUsed: "Hace 5 horas"
    },
    {
      name: "KYC API",
      description: "Verificación de identidad y KYC",
      status: "active",
      version: "v1.2",
      requests: 124,
      lastUsed: "Hace 3 días"
    },
    {
      name: "Analytics API",
      description: "Análisis de datos financieros",
      status: "beta",
      version: "v0.9",
      requests: 45,
      lastUsed: "Hace 1 día"
    }
  ];

  // Datos de ejemplo para las aplicaciones
  const applications = [
    {
      name: "E-commerce Integration",
      description: "Integración de pagos para tienda online",
      status: "production",
      created: "15/01/2025",
      apiKeys: 2
    },
    {
      name: "Mobile Banking App",
      description: "Aplicación móvil para clientes",
      status: "development",
      created: "03/02/2025",
      apiKeys: 1
    },
    {
      name: "Financial Dashboard",
      description: "Dashboard para análisis financiero",
      status: "testing",
      created: "22/01/2025",
      apiKeys: 3
    }
  ];

  // Datos de ejemplo para la documentación
  const documentation = [
    {
      title: "Guía de inicio rápido",
      description: "Cómo empezar a utilizar nuestras APIs",
      category: "Básico",
      url: "#"
    },
    {
      title: "Autenticación y Seguridad",
      description: "Implementación de OAuth 2.0 y JWT",
      category: "Seguridad",
      url: "#"
    },
    {
      title: "Webhooks",
      description: "Configuración y gestión de webhooks",
      category: "Avanzado",
      url: "#"
    },
    {
      title: "Manejo de Errores",
      description: "Códigos de error y solución de problemas",
      category: "Referencia",
      url: "#"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Portal de Desarrolladores</h1>
          <p className="text-muted-foreground">Herramientas y recursos para integrar con nuestra plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
          <Button>
            <Key className="h-4 w-4 mr-2" />
            Nueva API Key
          </Button>
        </div>
      </div>

      <Tabs defaultValue="apis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="applications">Aplicaciones</TabsTrigger>
          <TabsTrigger value="documentation">Documentación</TabsTrigger>
          <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
        </TabsList>

        <TabsContent value="apis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground mt-1">3 activas, 1 en beta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Solicitudes (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,268</div>
                <p className="text-xs text-muted-foreground mt-1">↑ 12% vs ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.8%</div>
                <p className="text-xs text-muted-foreground mt-1">↑ 0.2% vs ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124ms</div>
                <p className="text-xs text-muted-foreground mt-1">↓ 5ms vs ayer</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-3">Tus APIs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {apiEndpoints.map((api, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{api.name}</CardTitle>
                      <CardDescription className="mt-1">{api.description}</CardDescription>
                    </div>
                    <Badge variant={api.status === 'active' ? 'default' : 'secondary'}>
                      {api.status === 'active' ? 'Activa' : 'Beta'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Versión</p>
                      <p className="font-medium">{api.version}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Solicitudes (24h)</p>
                      <p className="font-medium">{api.requests}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Último uso</p>
                      <p className="font-medium">{api.lastUsed}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">
                      <Code className="h-4 w-4 mr-2" />
                      Documentación
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-2" />
                      Métricas
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tus Aplicaciones</h2>
            <Button>
              <FileCode className="h-4 w-4 mr-2" />
              Nueva Aplicación
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {applications.map((app, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{app.name}</CardTitle>
                    <Badge variant={
                      app.status === 'production' ? 'default' : 
                      app.status === 'development' ? 'outline' : 'secondary'
                    }>
                      {app.status === 'production' ? 'Producción' : 
                       app.status === 'development' ? 'Desarrollo' : 'Testing'}
                    </Badge>
                  </div>
                  <CardDescription className="mt-1">{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Creada</p>
                      <p className="font-medium">{app.created}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">API Keys</p>
                      <p className="font-medium">{app.apiKeys}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-2" />
                      API Keys
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Documentación</h2>
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Ver Toda la Documentación
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {documentation.map((doc, index) => (
              <Link to={doc.url} key={index}>
                <Card className="hover:bg-accent/5 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{doc.title}</CardTitle>
                      <Badge variant="outline">{doc.category}</Badge>
                    </div>
                    <CardDescription className="mt-1">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t px-6 py-4">
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Leer
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sandbox" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entorno de Sandbox</CardTitle>
              <CardDescription>
                Prueba tus integraciones en un entorno seguro antes de pasar a producción
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-md p-4 text-green-400 font-mono text-sm mb-4">
                <div>$ curl -X POST https://api-sandbox.example.com/v2/payments \</div>
                <div>&nbsp;&nbsp;-H "Authorization: Bearer sk_sandbox_123456789" \</div>
                <div>&nbsp;&nbsp;-H "Content-Type: application/json" \</div>
                <div>&nbsp;&nbsp;-d '&#123;"amount": 1000, "currency": "USD", "description": "Test payment"&#125;'</div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Terminal className="h-4 w-4 mr-2" />
                  Abrir Consola
                </Button>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Generar API Key de Sandbox
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
