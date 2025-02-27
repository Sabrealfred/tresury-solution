import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search, ArrowUpRight, ArrowDownLeft, FileText } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";

export default function BusinessHistory() {
  // Datos de ejemplo para las transacciones
  const transactions = [
    {
      id: "TRX-001",
      date: "2025-02-26",
      description: "Pago a Proveedor XYZ",
      amount: -2500.00,
      account: "Cuenta Corriente Principal",
      category: "Gastos Operativos",
      type: "outgoing",
      reference: "INV-2025-001"
    },
    {
      id: "TRX-002",
      date: "2025-02-25",
      description: "Cobro de Factura #INV-2023-004",
      amount: 4750.00,
      account: "Cuenta Corriente Principal",
      category: "Ingresos",
      type: "incoming",
      reference: "PAY-2025-004"
    },
    {
      id: "TRX-003",
      date: "2025-02-24",
      description: "Transferencia a Cuenta de Nómina",
      amount: -15000.00,
      account: "Cuenta Corriente Principal",
      category: "Transferencia Interna",
      type: "outgoing",
      reference: "TRF-2025-002"
    },
    {
      id: "TRX-004",
      date: "2025-02-24",
      description: "Transferencia desde Cuenta Principal",
      amount: 15000.00,
      account: "Cuenta para Nómina",
      category: "Transferencia Interna",
      type: "incoming",
      reference: "TRF-2025-002"
    },
    {
      id: "TRX-005",
      date: "2025-02-23",
      description: "Pago de Servicios",
      amount: -850.25,
      account: "Cuenta Corriente Principal",
      category: "Servicios",
      type: "outgoing",
      reference: "SERV-2025-001"
    },
    {
      id: "TRX-006",
      date: "2025-02-22",
      description: "Pago de Tarjeta Corporativa",
      amount: -1250.75,
      account: "Cuenta Corriente Principal",
      category: "Tarjetas",
      type: "outgoing",
      reference: "CARD-2025-001"
    },
    {
      id: "TRX-007",
      date: "2025-02-21",
      description: "Cobro de Cliente ABC",
      amount: 3500.00,
      account: "Cuenta Corriente Principal",
      category: "Ingresos",
      type: "incoming",
      reference: "PAY-2025-003"
    },
    {
      id: "TRX-008",
      date: "2025-02-20",
      description: "Pago de Impuestos",
      amount: -2100.00,
      account: "Cuenta para Impuestos",
      category: "Impuestos",
      type: "outgoing",
      reference: "TAX-2025-001"
    },
    {
      id: "TRX-009",
      date: "2025-02-19",
      description: "Intereses Cuenta de Ahorros",
      amount: 125.50,
      account: "Cuenta de Ahorros",
      category: "Intereses",
      type: "incoming",
      reference: "INT-2025-001"
    },
    {
      id: "TRX-010",
      date: "2025-02-18",
      description: "Pago de Nómina",
      amount: -12500.00,
      account: "Cuenta para Nómina",
      category: "Nómina",
      type: "outgoing",
      reference: "PAY-2025-002"
    },
  ];

  // Datos de ejemplo para los informes disponibles
  const reports = [
    {
      id: "REP-001",
      name: "Estado de Cuenta - Febrero 2025",
      type: "Estado de Cuenta",
      account: "Cuenta Corriente Principal",
      date: "2025-02-28",
      format: "PDF"
    },
    {
      id: "REP-002",
      name: "Estado de Cuenta - Enero 2025",
      type: "Estado de Cuenta",
      account: "Cuenta Corriente Principal",
      date: "2025-01-31",
      format: "PDF"
    },
    {
      id: "REP-003",
      name: "Informe de Transacciones - Febrero 2025",
      type: "Transacciones",
      account: "Todas las cuentas",
      date: "2025-02-28",
      format: "CSV"
    },
    {
      id: "REP-004",
      name: "Informe de Transacciones - Enero 2025",
      type: "Transacciones",
      account: "Todas las cuentas",
      date: "2025-01-31",
      format: "CSV"
    },
    {
      id: "REP-005",
      name: "Informe de Categorías - Febrero 2025",
      type: "Categorías",
      account: "Todas las cuentas",
      date: "2025-02-28",
      format: "PDF"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Historial</h1>
          <p className="text-muted-foreground">Consulta el historial de transacciones de tu empresa</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historial de Transacciones</CardTitle>
                <CardDescription>
                  Consulta todas las transacciones de tus cuentas
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar transacción..."
                    className="pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las cuentas</SelectItem>
                    <SelectItem value="main">Cuenta Corriente Principal</SelectItem>
                    <SelectItem value="savings">Cuenta de Ahorros</SelectItem>
                    <SelectItem value="payroll">Cuenta para Nómina</SelectItem>
                    <SelectItem value="taxes">Cuenta para Impuestos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Select defaultValue="all-categories">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-categories">Todas las categorías</SelectItem>
                        <SelectItem value="income">Ingresos</SelectItem>
                        <SelectItem value="expenses">Gastos</SelectItem>
                        <SelectItem value="transfers">Transferencias</SelectItem>
                        <SelectItem value="payroll">Nómina</SelectItem>
                        <SelectItem value="taxes">Impuestos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all-types">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-types">Todos los tipos</SelectItem>
                        <SelectItem value="incoming">Ingresos</SelectItem>
                        <SelectItem value="outgoing">Gastos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Seleccionar rango de fechas</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="range"
                          defaultMonth={new Date()}
                          locale={es}
                          selected={{
                            from: new Date(2025, 1, 1),
                            to: new Date(2025, 1, 28)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Cuenta</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Referencia</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">{transaction.date}</td>
                            <td className="p-4 align-middle font-medium">{transaction.description}</td>
                            <td className="p-4 align-middle">{transaction.account}</td>
                            <td className="p-4 align-middle">{transaction.category}</td>
                            <td className="p-4 align-middle">{transaction.reference}</td>
                            <td className={`p-4 align-middle text-right ${transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'}`}>
                              <div className="flex items-center justify-end">
                                {transaction.type === 'incoming' ? (
                                  <ArrowDownLeft className="h-4 w-4 mr-1" />
                                ) : (
                                  <ArrowUpRight className="h-4 w-4 mr-1" />
                                )}
                                ${Math.abs(transaction.amount).toLocaleString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Mostrando 10 de 156 transacciones
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Anterior</Button>
                    <Button variant="outline" size="sm">Siguiente</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informes Disponibles</CardTitle>
              <CardDescription>
                Descarga informes y estados de cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Select defaultValue="all-reports">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo de Informe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-reports">Todos los informes</SelectItem>
                        <SelectItem value="account-statements">Estados de Cuenta</SelectItem>
                        <SelectItem value="transactions">Transacciones</SelectItem>
                        <SelectItem value="categories">Categorías</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all-accounts">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Cuenta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-accounts">Todas las cuentas</SelectItem>
                        <SelectItem value="main">Cuenta Corriente Principal</SelectItem>
                        <SelectItem value="savings">Cuenta de Ahorros</SelectItem>
                        <SelectItem value="payroll">Cuenta para Nómina</SelectItem>
                        <SelectItem value="taxes">Cuenta para Impuestos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Generar Informe Personalizado
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Cuenta</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Fecha</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Formato</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map((report) => (
                          <tr key={report.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle font-medium">{report.name}</td>
                            <td className="p-4 align-middle">{report.type}</td>
                            <td className="p-4 align-middle">{report.account}</td>
                            <td className="p-4 align-middle text-center">{report.date}</td>
                            <td className="p-4 align-middle text-center">
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-700">
                                {report.format}
                              </span>
                            </td>
                            <td className="p-4 align-middle text-center">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Descargar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Flujo de Caja</CardTitle>
                <CardDescription>
                  Análisis de ingresos y gastos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Flujo de Caja</p>
                    <p className="text-xs text-muted-foreground">Ingresos vs Gastos</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Ingresos:</span>
                    <span className="text-green-600 font-medium">$8,375.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Gastos:</span>
                    <span className="text-red-600 font-medium">$34,200.00</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-medium">Balance Neto:</span>
                    <span className="text-red-600 font-medium">-$25,824.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categorías</CardTitle>
                <CardDescription>
                  Análisis de gastos por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Distribución</p>
                    <p className="text-xs text-muted-foreground">Gastos por Categoría</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Nómina</span>
                    <span>36.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gastos Operativos</span>
                    <span>7.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Servicios</span>
                    <span>2.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Impuestos</span>
                    <span>6.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tarjetas</span>
                    <span>3.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Transferencias</span>
                    <span>43.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Tendencias Mensuales</CardTitle>
              <CardDescription>
                Evolución de ingresos y gastos en los últimos meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-muted-foreground">Gráfico de Tendencias Mensuales</p>
                  <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
