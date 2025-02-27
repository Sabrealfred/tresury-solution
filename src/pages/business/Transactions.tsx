import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessTransactions() {
  // Datos de ejemplo para las transacciones
  const transactions = [
    {
      id: "TX-001",
      date: "2025-02-25",
      description: "Pago a Proveedor ABC",
      amount: -2500.00,
      status: "Completado",
      category: "Pagos",
      reference: "INV-2025-001"
    },
    {
      id: "TX-002",
      date: "2025-02-24",
      description: "Cobro de Cliente XYZ",
      amount: 3750.50,
      status: "Completado",
      category: "Ingresos",
      reference: "PAY-2025-002"
    },
    {
      id: "TX-003",
      date: "2025-02-23",
      description: "Pago de Servicios",
      amount: -450.75,
      status: "Completado",
      category: "Servicios",
      reference: "UTIL-2025-003"
    },
    {
      id: "TX-004",
      date: "2025-02-22",
      description: "Transferencia Bancaria",
      amount: -1200.00,
      status: "Completado",
      category: "Transferencias",
      reference: "TRF-2025-004"
    },
    {
      id: "TX-005",
      date: "2025-02-21",
      description: "Depósito de Cliente",
      amount: 5000.00,
      status: "Completado",
      category: "Ingresos",
      reference: "DEP-2025-005"
    },
    {
      id: "TX-006",
      date: "2025-02-20",
      description: "Pago de Impuestos",
      amount: -1875.25,
      status: "Completado",
      category: "Impuestos",
      reference: "TAX-2025-006"
    },
    {
      id: "TX-007",
      date: "2025-02-19",
      description: "Pago de Nómina",
      amount: -8500.00,
      status: "Completado",
      category: "Nómina",
      reference: "PAY-2025-007"
    },
    {
      id: "TX-008",
      date: "2025-02-18",
      description: "Cobro de Factura",
      amount: 3250.00,
      status: "Completado",
      category: "Ingresos",
      reference: "INV-2025-008"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Transacciones</h1>
          <p className="text-muted-foreground">Gestiona y visualiza todas las transacciones de tu negocio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filtrar por Fecha
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="incoming">Ingresos</TabsTrigger>
            <TabsTrigger value="outgoing">Gastos</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar transacción..."
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
                <SelectItem value="payments">Pagos</SelectItem>
                <SelectItem value="income">Ingresos</SelectItem>
                <SelectItem value="services">Servicios</SelectItem>
                <SelectItem value="transfers">Transferencias</SelectItem>
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
                <CardTitle>Historial de Transacciones</CardTitle>
                <CardDescription>Mostrando todas las transacciones</CardDescription>
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Referencia</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{transaction.id}</td>
                          <td className="p-4 align-middle">{transaction.date}</td>
                          <td className="p-4 align-middle">{transaction.description}</td>
                          <td className="p-4 align-middle">{transaction.category}</td>
                          <td className="p-4 align-middle">{transaction.reference}</td>
                          <td className={`p-4 align-middle text-right font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                              {transaction.status}
                            </span>
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

        <TabsContent value="incoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos</CardTitle>
              <CardDescription>Visualiza todos los ingresos de tu negocio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Referencia</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.filter(t => t.amount > 0).map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{transaction.id}</td>
                          <td className="p-4 align-middle">{transaction.date}</td>
                          <td className="p-4 align-middle">{transaction.description}</td>
                          <td className="p-4 align-middle">{transaction.category}</td>
                          <td className="p-4 align-middle">{transaction.reference}</td>
                          <td className="p-4 align-middle text-right font-medium text-green-500">
                            +${transaction.amount.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                              {transaction.status}
                            </span>
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

        <TabsContent value="outgoing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gastos</CardTitle>
              <CardDescription>Visualiza todos los gastos de tu negocio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Referencia</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.filter(t => t.amount < 0).map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{transaction.id}</td>
                          <td className="p-4 align-middle">{transaction.date}</td>
                          <td className="p-4 align-middle">{transaction.description}</td>
                          <td className="p-4 align-middle">{transaction.category}</td>
                          <td className="p-4 align-middle">{transaction.reference}</td>
                          <td className="p-4 align-middle text-right font-medium text-red-500">
                            -${Math.abs(transaction.amount).toFixed(2)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                              {transaction.status}
                            </span>
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
              <CardTitle>Transacciones Pendientes</CardTitle>
              <CardDescription>No hay transacciones pendientes actualmente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No hay transacciones pendientes en este momento</p>
                <Button variant="outline" className="mt-4">
                  Ver Todas las Transacciones
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
