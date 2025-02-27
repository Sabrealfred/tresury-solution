import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Plus, Search, FileText, Clock, CheckCircle, AlertCircle, BarChart, PieChart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessTaxes() {
  // Datos de ejemplo para los impuestos
  const taxes = [
    {
      id: "TAX-001",
      name: "Impuesto sobre Sociedades",
      period: "Anual",
      dueDate: "2025-06-30",
      estimatedAmount: 12500.00,
      status: "Pendiente",
      category: "Impuestos Directos"
    },
    {
      id: "TAX-002",
      name: "IVA",
      period: "Trimestral",
      dueDate: "2025-04-20",
      estimatedAmount: 4800.00,
      status: "Pendiente",
      category: "Impuestos Indirectos"
    },
    {
      id: "TAX-003",
      name: "Retenciones IRPF",
      period: "Trimestral",
      dueDate: "2025-04-20",
      estimatedAmount: 3200.00,
      status: "Pendiente",
      category: "Retenciones"
    },
    {
      id: "TAX-004",
      name: "Impuesto sobre Actividades Económicas",
      period: "Anual",
      dueDate: "2025-11-15",
      estimatedAmount: 850.00,
      status: "Pendiente",
      category: "Impuestos Locales"
    },
    {
      id: "TAX-005",
      name: "Seguridad Social",
      period: "Mensual",
      dueDate: "2025-03-31",
      estimatedAmount: 2100.00,
      status: "Pendiente",
      category: "Contribuciones Sociales"
    },
  ];

  // Datos de ejemplo para el historial de pagos
  const paymentHistory = [
    {
      id: "PAY-001",
      taxName: "IVA",
      period: "Q4 2024",
      paymentDate: "2025-01-20",
      amount: 4650.00,
      reference: "IVA-Q4-2024",
      status: "Pagado"
    },
    {
      id: "PAY-002",
      taxName: "Retenciones IRPF",
      period: "Q4 2024",
      paymentDate: "2025-01-20",
      amount: 3050.00,
      reference: "IRPF-Q4-2024",
      status: "Pagado"
    },
    {
      id: "PAY-003",
      taxName: "Seguridad Social",
      period: "Enero 2025",
      paymentDate: "2025-01-31",
      amount: 2100.00,
      reference: "SS-ENE-2025",
      status: "Pagado"
    },
    {
      id: "PAY-004",
      taxName: "Seguridad Social",
      period: "Febrero 2025",
      paymentDate: "2025-02-28",
      amount: 2100.00,
      reference: "SS-FEB-2025",
      status: "Programado"
    },
  ];

  // Datos de ejemplo para las deducciones
  const deductions = [
    {
      id: "DED-001",
      category: "Gastos de Personal",
      description: "Salarios y Seguridad Social",
      amount: 85000.00,
      status: "Verificado"
    },
    {
      id: "DED-002",
      category: "Gastos Operativos",
      description: "Alquiler de Oficina",
      amount: 24000.00,
      status: "Verificado"
    },
    {
      id: "DED-003",
      category: "Gastos Operativos",
      description: "Suministros y Servicios",
      amount: 12500.00,
      status: "Verificado"
    },
    {
      id: "DED-004",
      category: "Inversiones",
      description: "Equipamiento Tecnológico",
      amount: 18500.00,
      status: "Pendiente de Verificación"
    },
    {
      id: "DED-005",
      category: "Gastos Financieros",
      description: "Intereses de Préstamos",
      amount: 3200.00,
      status: "Verificado"
    },
  ];

  // Datos de ejemplo para la distribución de impuestos
  const taxDistribution = [
    { category: "Impuestos Directos", amount: 12500.00, percentage: 53 },
    { category: "Impuestos Indirectos", amount: 4800.00, percentage: 20 },
    { category: "Retenciones", amount: 3200.00, percentage: 14 },
    { category: "Contribuciones Sociales", amount: 2100.00, percentage: 9 },
    { category: "Impuestos Locales", amount: 850.00, percentage: 4 },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Impuestos</h1>
          <p className="text-muted-foreground">Gestiona los impuestos y obligaciones fiscales de tu negocio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendario Fiscal
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Registrar Pago
          </Button>
        </div>
      </div>

      {/* Resumen de Impuestos */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Impuestos Anuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$58,200.00</div>
            <p className="text-xs text-muted-foreground mt-1">Estimación para el año fiscal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31/03/2025</div>
            <p className="text-xs text-muted-foreground mt-1">Seguridad Social: $2,100.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,450.00</div>
            <p className="text-xs text-muted-foreground mt-1">Total de obligaciones pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deducciones Fiscales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$143,200.00</div>
            <p className="text-xs text-muted-foreground mt-1">Total de deducciones aplicables</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Próximos Impuestos</TabsTrigger>
          <TabsTrigger value="history">Historial de Pagos</TabsTrigger>
          <TabsTrigger value="deductions">Deducciones</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Obligaciones Fiscales</CardTitle>
                <CardDescription>
                  Impuestos y contribuciones pendientes
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="direct">Impuestos Directos</SelectItem>
                    <SelectItem value="indirect">Impuestos Indirectos</SelectItem>
                    <SelectItem value="withholding">Retenciones</SelectItem>
                    <SelectItem value="social">Contribuciones Sociales</SelectItem>
                    <SelectItem value="local">Impuestos Locales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Impuesto</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Periodo</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Vencimiento</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto Estimado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxes.map((tax) => (
                        <tr key={tax.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{tax.id}</td>
                          <td className="p-4 align-middle">{tax.name}</td>
                          <td className="p-4 align-middle">{tax.category}</td>
                          <td className="p-4 align-middle text-center">{tax.period}</td>
                          <td className="p-4 align-middle text-center">{tax.dueDate}</td>
                          <td className="p-4 align-middle text-right">${tax.estimatedAmount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-100 text-yellow-700">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {tax.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Detalles
                              </Button>
                              <Button variant="ghost" size="sm">
                                Pagar
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

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Calendario de Vencimientos</CardTitle>
                <CardDescription>
                  Próximos vencimientos fiscales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  {/* Aquí iría el componente de calendario real */}
                  <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                    <div className="text-center">
                      <Calendar className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-muted-foreground">Calendario Fiscal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Distribución de Impuestos</CardTitle>
                <CardDescription>
                  Desglose por categoría de impuesto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Aquí iría el componente de gráfico real */}
                  <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-muted-foreground">Gráfico de Distribución</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  {taxDistribution.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.percentage}% del total</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>
                  Registro de pagos de impuestos realizados
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar pago..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Impuesto</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Periodo</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Fecha de Pago</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Referencia</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{payment.id}</td>
                          <td className="p-4 align-middle">{payment.taxName}</td>
                          <td className="p-4 align-middle">{payment.period}</td>
                          <td className="p-4 align-middle text-center">{payment.paymentDate}</td>
                          <td className="p-4 align-middle text-right">${payment.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{payment.reference}</td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              payment.status === 'Pagado' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {payment.status === 'Pagado' ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {payment.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-3 w-3 mr-1" />
                                Comprobante
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

          <Card>
            <CardHeader>
              <CardTitle>Evolución de Pagos de Impuestos</CardTitle>
              <CardDescription>
                Histórico de pagos por trimestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* Aquí iría el componente de gráfico real */}
                <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Evolución de Pagos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Deducciones Fiscales</CardTitle>
                <CardDescription>
                  Gastos deducibles para la declaración de impuestos
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Deducción
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deductions.map((deduction) => (
                        <tr key={deduction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{deduction.id}</td>
                          <td className="p-4 align-middle">{deduction.category}</td>
                          <td className="p-4 align-middle">{deduction.description}</td>
                          <td className="p-4 align-middle text-right">${deduction.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              deduction.status === 'Verificado' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {deduction.status === 'Verificado' ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {deduction.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-3 w-3 mr-1" />
                                Documentos
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Deducciones</CardTitle>
                <CardDescription>
                  Desglose por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  {/* Aquí iría el componente de gráfico real */}
                  <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-muted-foreground">Gráfico de Deducciones</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impacto Fiscal</CardTitle>
                <CardDescription>
                  Ahorro estimado en impuestos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Total Deducciones</h3>
                        <p className="text-sm text-muted-foreground">Gastos deducibles acumulados</p>
                      </div>
                      <div className="text-xl font-bold">$143,200.00</div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Ahorro Fiscal Estimado</h3>
                        <p className="text-sm text-muted-foreground">Basado en la tasa impositiva actual</p>
                      </div>
                      <div className="text-xl font-bold text-green-600">$35,800.00</div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Tasa Efectiva de Impuestos</h3>
                        <p className="text-sm text-muted-foreground">Después de deducciones</p>
                      </div>
                      <div className="text-xl font-bold">18.5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informes Fiscales</CardTitle>
              <CardDescription>
                Informes y documentación fiscal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Declaración Anual de Impuestos</h3>
                        <p className="text-sm text-muted-foreground">Año Fiscal 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Resumen de IVA</h3>
                        <p className="text-sm text-muted-foreground">Q4 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Informe de Retenciones</h3>
                        <p className="text-sm text-muted-foreground">Q4 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Certificados de Retención</h3>
                        <p className="text-sm text-muted-foreground">Año 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
