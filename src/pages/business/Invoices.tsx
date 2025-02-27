import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Plus, Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessInvoices() {
  // Datos de ejemplo para las facturas
  const invoices = [
    {
      id: "INV-001",
      date: "2025-02-25",
      dueDate: "2025-03-25",
      client: "Cliente ABC",
      amount: 2500.00,
      status: "Pagada",
      items: [
        { description: "Servicio de Consultoría", quantity: 10, price: 250.00 }
      ]
    },
    {
      id: "INV-002",
      date: "2025-02-24",
      dueDate: "2025-03-24",
      client: "Cliente XYZ",
      amount: 3750.50,
      status: "Pendiente",
      items: [
        { description: "Desarrollo de Software", quantity: 15, price: 250.03 }
      ]
    },
    {
      id: "INV-003",
      date: "2025-02-23",
      dueDate: "2025-03-23",
      client: "Cliente 123",
      amount: 1200.00,
      status: "Vencida",
      items: [
        { description: "Mantenimiento Mensual", quantity: 1, price: 1200.00 }
      ]
    },
    {
      id: "INV-004",
      date: "2025-02-22",
      dueDate: "2025-03-22",
      client: "Cliente DEF",
      amount: 5000.00,
      status: "Pagada",
      items: [
        { description: "Implementación de Sistema", quantity: 1, price: 5000.00 }
      ]
    },
    {
      id: "INV-005",
      date: "2025-02-21",
      dueDate: "2025-03-21",
      client: "Cliente GHI",
      amount: 750.00,
      status: "Pendiente",
      items: [
        { description: "Soporte Técnico", quantity: 5, price: 150.00 }
      ]
    },
    {
      id: "INV-006",
      date: "2025-02-20",
      dueDate: "2025-03-20",
      client: "Cliente JKL",
      amount: 3250.00,
      status: "Pagada",
      items: [
        { description: "Diseño de Marca", quantity: 1, price: 3250.00 }
      ]
    },
    {
      id: "INV-007",
      date: "2025-02-19",
      dueDate: "2025-03-19",
      client: "Cliente MNO",
      amount: 1875.25,
      status: "Pendiente",
      items: [
        { description: "Servicios de Marketing", quantity: 1, price: 1875.25 }
      ]
    },
    {
      id: "INV-008",
      date: "2025-02-18",
      dueDate: "2025-03-18",
      client: "Cliente PQR",
      amount: 950.00,
      status: "Borrador",
      items: [
        { description: "Análisis de Datos", quantity: 1, price: 950.00 }
      ]
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Facturación</h1>
          <p className="text-muted-foreground">Gestiona y crea facturas para tus clientes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Factura
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="paid">Pagadas</TabsTrigger>
            <TabsTrigger value="overdue">Vencidas</TabsTrigger>
            <TabsTrigger value="draft">Borradores</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar factura..."
                className="pl-8 w-[250px]"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los clientes</SelectItem>
                <SelectItem value="abc">Cliente ABC</SelectItem>
                <SelectItem value="xyz">Cliente XYZ</SelectItem>
                <SelectItem value="123">Cliente 123</SelectItem>
                <SelectItem value="def">Cliente DEF</SelectItem>
                <SelectItem value="ghi">Cliente GHI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <CardTitle>Todas las Facturas</CardTitle>
                <CardDescription>Mostrando todas las facturas</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Nº Factura</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Vencimiento</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{invoice.id}</td>
                          <td className="p-4 align-middle">{invoice.date}</td>
                          <td className="p-4 align-middle">{invoice.dueDate}</td>
                          <td className="p-4 align-middle">{invoice.client}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${invoice.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              invoice.status === 'Pagada' 
                                ? 'bg-green-100 text-green-700' 
                                : invoice.status === 'Pendiente'
                                ? 'bg-blue-100 text-blue-700'
                                : invoice.status === 'Vencida'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Ver
                              </Button>
                              {invoice.status === 'Pendiente' && (
                                <Button variant="ghost" size="sm" className="text-blue-500">
                                  <Send className="h-3 w-3 mr-1" />
                                  Enviar
                                </Button>
                              )}
                              {invoice.status === 'Borrador' && (
                                <Button variant="ghost" size="sm">
                                  Editar
                                </Button>
                              )}
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

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facturas Pendientes</CardTitle>
              <CardDescription>Facturas emitidas pendientes de pago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Nº Factura</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Vencimiento</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.filter(i => i.status === 'Pendiente').map((invoice) => (
                        <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{invoice.id}</td>
                          <td className="p-4 align-middle">{invoice.date}</td>
                          <td className="p-4 align-middle">{invoice.dueDate}</td>
                          <td className="p-4 align-middle">{invoice.client}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${invoice.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Ver
                              </Button>
                              <Button variant="ghost" size="sm" className="text-blue-500">
                                <Send className="h-3 w-3 mr-1" />
                                Enviar
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

        <TabsContent value="paid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facturas Pagadas</CardTitle>
              <CardDescription>Facturas que ya han sido pagadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Nº Factura</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.filter(i => i.status === 'Pagada').map((invoice) => (
                        <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{invoice.id}</td>
                          <td className="p-4 align-middle">{invoice.date}</td>
                          <td className="p-4 align-middle">{invoice.client}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${invoice.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Ver
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-3 w-3 mr-1" />
                                PDF
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

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facturas Vencidas</CardTitle>
              <CardDescription>Facturas con fecha de vencimiento pasada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Nº Factura</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Vencimiento</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.filter(i => i.status === 'Vencida').map((invoice) => (
                        <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{invoice.id}</td>
                          <td className="p-4 align-middle">{invoice.date}</td>
                          <td className="p-4 align-middle">{invoice.dueDate}</td>
                          <td className="p-4 align-middle">{invoice.client}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${invoice.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Ver
                              </Button>
                              <Button variant="ghost" size="sm" className="text-blue-500">
                                Recordar
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

        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borradores</CardTitle>
              <CardDescription>Facturas en estado de borrador</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Nº Factura</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.filter(i => i.status === 'Borrador').map((invoice) => (
                        <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{invoice.id}</td>
                          <td className="p-4 align-middle">{invoice.date}</td>
                          <td className="p-4 align-middle">{invoice.client}</td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${invoice.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-blue-500">
                                Finalizar
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
      </Tabs>
    </div>
  );
}
