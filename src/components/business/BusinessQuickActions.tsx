import { Link } from "react-router-dom";
import { ChevronRight, FileText, BarChart, CreditCard, Calculator, Users } from "lucide-react";

export function BusinessQuickActions() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Link to="/business/invoices" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Facturas</h3>
        <p className="text-sm text-muted-foreground">Gestiona tus facturas y cobros</p>
      </Link>

      <Link to="/business/cash-flow" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BarChart className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Flujo de Caja</h3>
        <p className="text-sm text-muted-foreground">Analiza tus ingresos y gastos</p>
      </Link>

      <Link to="/business/payments" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Pagos</h3>
        <p className="text-sm text-muted-foreground">Realiza pagos a proveedores</p>
      </Link>

      <Link to="/business/taxes" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Impuestos</h3>
        <p className="text-sm text-muted-foreground">Gestiona obligaciones fiscales</p>
      </Link>

      <Link to="/business/payroll" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Nómina</h3>
        <p className="text-sm text-muted-foreground">Gestiona pagos a empleados</p>
      </Link>

      <Link to="/business/investments" className="glass-card p-6 hover:bg-accent/5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BarChart className="h-5 w-5 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Inversiones</h3>
        <p className="text-sm text-muted-foreground">Gestiona inversiones empresariales</p>
      </Link>
    </div>
  );
}
