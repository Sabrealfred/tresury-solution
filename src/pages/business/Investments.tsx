import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Plus, Search, ArrowUp, ArrowDown, LineChart, PieChart, BarChart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessInvestments() {
  // Datos de ejemplo para las inversiones
  const investments = [
    {
      id: "INV-001",
      name: "Fondo de Mercado Monetario",
      type: "Renta Fija",
      initialAmount: 25000.00,
      currentValue: 26250.00,
      returnRate: 5.00,
      returnAmount: 1250.00,
      startDate: "2024-09-15",
      term: "Sin plazo",
      risk: "Bajo"
    },
    {
      id: "INV-002",
      name: "Fondo de Bonos Corporativos",
      type: "Renta Fija",
      initialAmount: 50000.00,
      currentValue: 53500.00,
      returnRate: 7.00,
      returnAmount: 3500.00,
      startDate: "2024-06-20",
      term: "3 años",
      risk: "Medio-Bajo"
    },
    {
      id: "INV-003",
      name: "Fondo de Acciones",
      type: "Renta Variable",
      initialAmount: 30000.00,
      currentValue: 34800.00,
      returnRate: 16.00,
      returnAmount: 4800.00,
      startDate: "2024-03-10",
      term: "Sin plazo",
      risk: "Alto"
    },
    {
      id: "INV-004",
      name: "Certificado de Depósito",
      type: "Renta Fija",
      initialAmount: 20000.00,
      currentValue: 20800.00,
      returnRate: 4.00,
      returnAmount: 800.00,
      startDate: "2024-10-05",
      term: "1 año",
      risk: "Bajo"
    },
  ];

  // Datos de ejemplo para el rendimiento histórico
  const historicalPerformance = [
    { month: "Enero", value: 125000 },
    { month: "Febrero", value: 127500 },
    { month: "Marzo", value: 129000 },
    { month: "Abril", value: 128000 },
    { month: "Mayo", value: 130500 },
    { month: "Junio", value: 133000 },
    { month: "Julio", value: 135000 },
    { month: "Agosto", value: 134000 },
    { month: "Septiembre", value: 136500 },
    { month: "Octubre", value: 138000 },
    { month: "Noviembre", value: 140000 },
    { month: "Diciembre", value: 143000 },
  ];

  // Datos de ejemplo para la distribución de activos
  const assetDistribution = [
    { category: "Renta Fija", amount: 100550.00, percentage: 74 },
    { category: "Renta Variable", amount: 34800.00, percentage: 26 },
  ];

  // Datos de ejemplo para las oportunidades de inversión
  const investmentOpportunities = [
    {
      id: "OPP-001",
      name: "Fondo de Inversión Tecnológica",
      type: "Renta Variable",
      minAmount: 10000.00,
      expectedReturn: "12-15%",
      term: "Sin plazo",
      risk: "Alto",
      description: "Fondo que invierte en empresas tecnológicas con alto potencial de crecimiento."
    },
    {
      id: "OPP-002",
      name: "Bonos Gubernamentales",
      type: "Renta Fija",
      minAmount: 5000.00,
      expectedReturn: "4-5%",
      term: "2-5 años",
      risk: "Bajo",
      description: "Inversión en bonos emitidos por el gobierno con rendimiento fijo."
    },
    {
      id: "OPP-003",
      name: "Fondo de Bienes Raíces",
      type: "Mixto",
      minAmount: 25000.00,
      expectedReturn: "8-10%",
      term: "3-7 años",
      risk: "Medio",
      description: "Inversión en propiedades comerciales y residenciales con potencial de apreciación y generación de ingresos."
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Inversiones</h1>
          <p className="text-muted-foreground">Gestiona y monitorea tus inversiones empresariales</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Último mes</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
              <SelectItem value="all">Todo el periodo</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Inversión
          </Button>
        </div>
      </div>

      {/* Resumen de Inversiones */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total de Inversiones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$135,350.00</div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8.3%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Desde la inversión inicial</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$10,350.00</div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8.3%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ganancias acumuladas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento Anualizado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7.2%</div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+0.5%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Comparado con el periodo anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Inversiones Actuales</CardTitle>
                <CardDescription>
                  Detalle de tus inversiones activas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Valor Inicial</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Valor Actual</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Rendimiento</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Riesgo</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {investments.map((investment) => (
                          <tr key={investment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle font-medium">{investment.name}</td>
                            <td className="p-4 align-middle">{investment.type}</td>
                            <td className="p-4 align-middle text-right">${investment.initialAmount.toLocaleString()}</td>
                            <td className="p-4 align-middle text-right">${investment.currentValue.toLocaleString()}</td>
                            <td className="p-4 align-middle text-right text-green-600">
                              +{investment.returnRate}% (${investment.returnAmount.toLocaleString()})
                            </td>
                            <td className="p-4 align-middle text-center">
                              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                                investment.risk === 'Bajo' 
                                  ? 'bg-green-100 text-green-700' 
                                  : investment.risk === 'Medio-Bajo' || investment.risk === 'Medio'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {investment.risk}
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

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Distribución de Activos</CardTitle>
                <CardDescription>
                  Distribución de tus inversiones por tipo de activo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  {/* Aquí iría el componente de gráfico real */}
                  <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-muted-foreground">Gráfico de Distribución de Activos</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  {assetDistribution.map((asset) => (
                    <div key={asset.category} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{asset.category}</p>
                        <p className="text-sm text-muted-foreground">{asset.percentage}% del portafolio</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${asset.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento Histórico</CardTitle>
              <CardDescription>
                Evolución del valor de tus inversiones en el tiempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                {/* Aquí iría el componente de gráfico real */}
                <div className="h-full w-full flex items-center justify-center border rounded-md bg-gray-50">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Gráfico de Rendimiento Histórico</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Valores Mensuales</h3>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Mes</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Valor del Portafolio</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Cambio Mensual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historicalPerformance.map((month, index) => {
                          const prevMonth = index > 0 ? historicalPerformance[index - 1].value : month.value;
                          const change = ((month.value - prevMonth) / prevMonth) * 100;
                          return (
                            <tr key={month.month} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <td className="p-4 align-middle font-medium">{month.month}</td>
                              <td className="p-4 align-middle text-right">${month.value.toLocaleString()}</td>
                              <td className={`p-4 align-middle text-right ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {investmentOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{opportunity.name}</CardTitle>
                  <CardDescription>
                    {opportunity.type} • Rendimiento esperado: {opportunity.expectedReturn}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Inversión mínima:</span>
                        <span className="text-sm font-medium">${opportunity.minAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Plazo:</span>
                        <span className="text-sm font-medium">{opportunity.term}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Nivel de riesgo:</span>
                        <span className={`text-sm font-medium ${
                          opportunity.risk === 'Bajo' 
                            ? 'text-green-600' 
                            : opportunity.risk === 'Medio'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                          {opportunity.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full">
                    Invertir Ahora
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informes de Inversión</CardTitle>
              <CardDescription>
                Informes detallados sobre el rendimiento de tus inversiones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Informe de Rendimiento Mensual</h3>
                        <p className="text-sm text-muted-foreground">Febrero 2025</p>
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
                      <PieChart className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Informe de Distribución de Activos</h3>
                        <p className="text-sm text-muted-foreground">Febrero 2025</p>
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
                      <LineChart className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Informe de Rendimiento Anual</h3>
                        <p className="text-sm text-muted-foreground">2024</p>
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
                      <BarChart className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Informe de Rendimiento por Inversión</h3>
                        <p className="text-sm text-muted-foreground">Febrero 2025</p>
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
