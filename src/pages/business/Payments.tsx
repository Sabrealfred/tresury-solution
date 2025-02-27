import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessPayments() {
  // Datos de ejemplo para los pagos
  const payments = [
    {
      id: "PAY-001",
      date: "2025-02-25",
      recipient: "Proveedor ABC",
      amount: 2500.00,
      status: "Completado",
      category: "Proveedores",
      method: "Transferencia"
    },
    {
      id: "PAY-002",
      date: "2025-02-24",
      recipient: "Servicios Públicos",
      amount: 450.75,
      status: "Completado",
      category: "Servicios",
      method: "Débito Automático"
    },
    {
      id: "PAY-003",
      date: "2025-02-23",
      recipient: "Alquiler Oficina",
      amount: 1800.00,
      status: "Programado",
      category: "Alquiler",
      method: "Transferencia",
      dueDate: "2025-03-01"
    },
    {
      id: "PAY-004",
      date: "2025-02-22",
      recipient: "Seguro Empresarial",
      amount: 750.00,
      status: "Completado",
      category: "Seguros",
      method: "Débito Automático"
    },
    {
      id: "PAY-005",
      date: "2025-02-21",
      recipient: "Impuestos Municipales",
      amount: 1875.25,
      status: "Completado",
      category: "Impuestos",
      method: "Transferencia"
    },
    {
      id: "PAY-006",
      date: "2025-02-20",
      recipient: "Nómina Empleados",
      amount: 8500.00,
      status: "Completado",
      category: "Nómina",
      method: "Transferencia Masiva"
    },
    {
      id: "PAY-007",
      date: "2025-02-19",
      recipient: "Mantenimiento Equipos",
      amount: 350.00,
      status: "Completado",
      category: "Mantenimiento",
      method: "Transferencia"
    },
    {
      id: "PAY-008",
      date: "2025-02-18",
      recipient: "Proveedor XYZ",
      amount: 1250.00,
      status: "Programado",
      category: "Proveedores",
      method: "Transferencia",
      dueDate: "2025-03-05"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Pagos</h1>
          <p className="text-muted-foreground">Gestiona y programa los pagos de tu negocio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendario de Pagos
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Pago
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
            <TabsTrigger value="scheduled">Programados</TabsTrigger>
            <TabsTrigger value="recurring">Recurrentes</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar pago..."
                className="pl-8 w-[250px]"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="providers">Proveedores</SelectItem>
                <SelectItem value="services">Servicios</SelectItem>
                <SelectItem value="rent">Alquiler</SelectItem>
                <SelectItem value="insurance">Seguros</SelectItem>
                <SelectItem value="taxes">Impuestos</SelectItem>
                <SelectItem value="payroll">Nómina</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>Mostrando todos los pagos</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Destinatario</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Método</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{payment.id}</td>
                          <td className="p-4 align-middle">{payment.date}</td>
                          <td className="p-4 align-middle">{payment.recipient}</td>
                          <td className="p-4 align-middle">{payment.category}</td>
                          <td className="p-4 align-middle">{payment.method}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              payment.status === 'Completado' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <Button variant="ghost" size="sm">
                              Detalles
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Completados</CardTitle>
              <CardDescription>Visualiza todos los pagos completados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Destinatario</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Método</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.filter(p => p.status === 'Completado').map((payment) => (
                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{payment.id}</td>
                          <td className="p-4 align-middle">{payment.date}</td>
                          <td className="p-4 align-middle">{payment.recipient}</td>
                          <td className="p-4 align-middle">{payment.category}</td>
                          <td className="p-4 align-middle">{payment.method}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <Button variant="ghost" size="sm">
                              Detalles
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Programados</CardTitle>
              <CardDescription>Visualiza todos los pagos programados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha Programada</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Destinatario</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Método</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.filter(p => p.status === 'Programado').map((payment) => (
                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{payment.id}</td>
                          <td className="p-4 align-middle">{payment.dueDate}</td>
                          <td className="p-4 align-middle">{payment.recipient}</td>
                          <td className="p-4 align-middle">{payment.category}</td>
                          <td className="p-4 align-middle">{payment.method}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                Cancelar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Recurrentes</CardTitle>
              <CardDescription>Configura y gestiona pagos automáticos recurrentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No hay pagos recurrentes configurados</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Configurar Pago Recurrente
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
