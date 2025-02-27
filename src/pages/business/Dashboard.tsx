import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "lucide-react";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { BusinessQuickActions } from "@/components/business/BusinessQuickActions";
import { NotificationsList, DashboardNotification } from "@/components/dashboard/NotificationsList";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function BusinessDashboard() {
  // Datos de ejemplo para las estadísticas
  const currentEarning = 12234.50;
  const previousEarning = 11730.00;
  const currentSpending = 8329.10;
  const previousSpending = 8542.67;

  // Datos de ejemplo para el gráfico
  const monthlyData = [
    { month: "January", earning: 10500, spending: 7800 },
    { month: "February", earning: 11200, spending: 8100 },
    { month: "March", earning: 10800, spending: 7900 },
    { month: "April", earning: 11500, spending: 8300 },
    { month: "May", earning: 12200, spending: 8500 },
    { month: "June", earning: 12800, spending: 8200 },
  ];

  // Datos de ejemplo para notificaciones
  const notificationsData: DashboardNotification[] = [
    {
      id: "1",
      title: "Factura pagada",
      description: "La factura #INV-2023-004 ha sido pagada",
      time: "Hace 2 horas",
      type: "income",
      amount: 1250.00
    },
    {
      id: "2",
      title: "Nueva transferencia recibida",
      description: "Has recibido $1,250.00 de Cliente XYZ",
      time: "Hace 5 horas",
      type: "income",
      amount: 1250.00
    },
    {
      id: "3",
      title: "Recordatorio de pago",
      description: "Tienes un pago programado para mañana",
      time: "Hace 1 día",
      type: "bill",
      amount: 350.75
    },
    {
      id: "4",
      title: "Actualización de servicio",
      description: "Nuevas funciones disponibles en tu cuenta",
      time: "Hace 3 días",
      type: "info",
      amount: 0
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Dashboard de Negocio</h1>
          <p className="text-muted-foreground">Bienvenido a tu panel de control empresarial</p>
        </div>
        <div className="flex gap-2">
          <Link to="/business/transactions">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Informe Mensual
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="analytics">Analítica</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatisticsCards 
            currentEarning={currentEarning}
            previousEarning={previousEarning}
            currentSpending={currentSpending}
            previousSpending={previousSpending}
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Flujo de Caja</CardTitle>
                <CardDescription>
                  Ingresos y gastos de los últimos 30 días
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <StatisticsChart monthlyData={monthlyData} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Accede rápidamente a las funciones más utilizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BusinessQuickActions />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Transacciones Recientes</CardTitle>
                <CardDescription>
                  Últimos movimientos en tus cuentas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Aquí iría el componente de transacciones recientes */}
                <div className="rounded-md border">
                  <div className="p-4">
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <LineChart className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Pago a Proveedor {item}</p>
                              <p className="text-xs text-gray-500">Hace {item} días</p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-red-500">
                            -${(Math.random() * 1000).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Últimas alertas y notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationsList notifications={notificationsData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Financiero</CardTitle>
              <CardDescription>
                Análisis detallado de tus finanzas empresariales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Módulo de análisis financiero en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informes Empresariales</CardTitle>
              <CardDescription>
                Genera y descarga informes de tu negocio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Módulo de informes en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Centro de Notificaciones</CardTitle>
              <CardDescription>
                Todas tus notificaciones y alertas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsList notifications={notificationsData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
