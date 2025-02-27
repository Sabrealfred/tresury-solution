import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, LineChart, BarChart, PieChart, ArrowUp, ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessCashFlow() {
  // Datos de ejemplo para el flujo de caja
  const monthlyData = [
    { month: "Enero", income: 15500, expenses: 12800, balance: 2700 },
    { month: "Febrero", income: 16200, expenses: 13100, balance: 3100 },
    { month: "Marzo", income: 15800, expenses: 12900, balance: 2900 },
    { month: "Abril", income: 16500, expenses: 13300, balance: 3200 },
    { month: "Mayo", income: 17200, expenses: 13500, balance: 3700 },
    { month: "Junio", income: 17800, expenses: 13200, balance: 4600 },
  ];

  // Datos de ejemplo para categorías de ingresos
  const incomeCategories = [
    { category: "Ventas de Productos", amount: 45000, percentage: 55 },
    { category: "Servicios", amount: 25000, percentage: 30 },
    { category: "Suscripciones", amount: 8000, percentage: 10 },
    { category: "Otros", amount: 4000, percentage: 5 },
  ];

  // Datos de ejemplo para categorías de gastos
  const expenseCategories = [
    { category: "Nómina", amount: 35000, percentage: 45 },
    { category: "Alquiler", amount: 12000, percentage: 15 },
    { category: "Servicios", amount: 8000, percentage: 10 },
    { category: "Marketing", amount: 7000, percentage: 9 },
    { category: "Suministros", amount: 6000, percentage: 8 },
    { category: "Impuestos", amount: 5000, percentage: 6 },
    { category: "Otros", amount: 5500, percentage: 7 },
  ];

  // Datos de ejemplo para proyecciones
  const projections = [
    { month: "Julio", income: 18500, expenses: 13800, balance: 4700 },
    { month: "Agosto", income: 19000, expenses: 14000, balance: 5000 },
    { month: "Septiembre", income: 19500, expenses: 14200, balance: 5300 },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Flujo de Caja</h1>
          <p className="text-muted-foreground">Análisis y proyecciones del flujo de caja de tu negocio</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="6m">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Último mes</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Resumen de Flujo de Caja */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$99,000.00</div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8.2%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Comparado con el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$78,800.00</div>
              <div className="flex items-center text-red-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+3.1%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Comparado con el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Balance Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$20,200.00</div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12.5%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Comparado con el periodo anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="income">Ingresos</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
          <TabsTrigger value="projections">Proyecciones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flujo de Caja Mensual</CardTitle>
              <CardDescription>
                Ingresos, gastos y balance neto de los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                {/* Aquí iría el componente de gráfico real */}
                <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Flujo de Caja Mensual</p>
                    <p className="text-xs text-muted-foreground">Ingresos vs Gastos vs Balance</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {monthlyData.map((month) => (
                  <Card key={month.month} className="bg-gray-50">
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm">{month.month}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ingresos:</span>
                          <span className="font-medium text-green-600">${month.income.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gastos:</span>
                          <span className="font-medium text-red-600">${month.expenses.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1 mt-1">
                          <span className="font-medium">Balance:</span>
                          <span className="font-medium">${month.balance.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Distribución de Ingresos</CardTitle>
                <CardDescription>
                  Desglose de ingresos por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Aquí iría el componente de gráfico real */}
                  <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-muted-foreground">Gráfico de Distribución de Ingresos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Categorías de Ingresos</CardTitle>
                <CardDescription>
                  Detalle por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomeCategories.map((category) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-muted-foreground">{category.percentage}% del total</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${category.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Ingresos</CardTitle>
              <CardDescription>
                Evolución de ingresos en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                {/* Aquí iría el componente de gráfico real */}
                <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Tendencia de Ingresos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
                <CardDescription>
                  Desglose de gastos por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Aquí iría el componente de gráfico real */}
                  <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-muted-foreground">Gráfico de Distribución de Gastos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Categorías de Gastos</CardTitle>
                <CardDescription>
                  Detalle por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-muted-foreground">{category.percentage}% del total</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${category.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Gastos</CardTitle>
              <CardDescription>
                Evolución de gastos en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                {/* Aquí iría el componente de gráfico real */}
                <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Tendencia de Gastos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proyecciones Financieras</CardTitle>
              <CardDescription>
                Proyecciones de flujo de caja para los próximos 3 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* Aquí iría el componente de gráfico real */}
                <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Proyecciones Financieras</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Proyecciones Mensuales</h3>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Mes</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Ingresos Proyectados</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Gastos Proyectados</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Balance Proyectado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projections.map((month) => (
                          <tr key={month.month} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle font-medium">{month.month}</td>
                            <td className="p-4 align-middle text-right text-green-600">${month.income.toLocaleString()}</td>
                            <td className="p-4 align-middle text-right text-red-600">${month.expenses.toLocaleString()}</td>
                            <td className="p-4 align-middle text-right font-medium">${month.balance.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50">
                          <td className="p-4 align-middle font-medium">Total Proyectado</td>
                          <td className="p-4 align-middle text-right font-medium text-green-600">
                            ${projections.reduce((sum, month) => sum + month.income, 0).toLocaleString()}
                          </td>
                          <td className="p-4 align-middle text-right font-medium text-red-600">
                            ${projections.reduce((sum, month) => sum + month.expenses, 0).toLocaleString()}
                          </td>
                          <td className="p-4 align-middle text-right font-medium">
                            ${projections.reduce((sum, month) => sum + month.balance, 0).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Escenarios de Proyección</CardTitle>
              <CardDescription>
                Comparativa de escenarios optimista, realista y pesimista
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-green-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Escenario Optimista</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$17,000.00</div>
                    <p className="text-xs text-muted-foreground mt-1">Balance proyectado mensual promedio</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ingresos:</span>
                        <span>$21,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gastos:</span>
                        <span>$14,000.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Escenario Realista</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15,000.00</div>
                    <p className="text-xs text-muted-foreground mt-1">Balance proyectado mensual promedio</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ingresos:</span>
                        <span>$19,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gastos:</span>
                        <span>$14,000.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Escenario Pesimista</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,000.00</div>
                    <p className="text-xs text-muted-foreground mt-1">Balance proyectado mensual promedio</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ingresos:</span>
                        <span>$17,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gastos:</span>
                        <span>$15,000.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
