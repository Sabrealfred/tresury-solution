import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart, Briefcase, TrendingUp, Shield } from "lucide-react";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { NotificationsList, DashboardNotification } from "@/components/dashboard/NotificationsList";
import { WealthManagement } from "@/components/private/WealthManagement";

export default function PrivateBankingDashboard() {
  // Datos de ejemplo para las estadísticas
  const currentEarning = 85234.50;
  const previousEarning = 78730.00;
  const currentSpending = 32329.10;
  const previousSpending = 35542.67;

  // Datos de ejemplo para el gráfico
  const monthlyData = [
    { month: "January", earning: 70500, spending: 30800 },
    { month: "February", earning: 72200, spending: 31100 },
    { month: "March", earning: 75800, spending: 32900 },
    { month: "April", earning: 78500, spending: 31300 },
    { month: "May", earning: 82200, spending: 32500 },
    { month: "June", earning: 85800, spending: 32200 },
  ];

  // Datos de ejemplo para notificaciones
  const notificationsData: DashboardNotification[] = [
    {
      id: "1",
      title: "Oportunidad de inversión",
      description: "Nueva oportunidad de inversión en el sector tecnológico",
      time: "Hace 2 horas",
      type: "info",
      amount: 0
    },
    {
      id: "2",
      title: "Dividendos recibidos",
      description: "Has recibido $3,250.00 en dividendos de tus inversiones",
      time: "Hace 5 horas",
      type: "income",
      amount: 3250.00
    },
    {
      id: "3",
      title: "Asesoría programada",
      description: "Tienes una reunión con tu asesor financiero mañana",
      time: "Hace 1 día",
      type: "bill",
      amount: 0
    },
    {
      id: "4",
      title: "Actualización de cartera",
      description: "Tu cartera de inversiones ha sido actualizada",
      time: "Hace 3 días",
      type: "info",
      amount: 0
    },
  ];

  // Datos de ejemplo para servicios de banca privada
  const privateServices = [
    {
      title: "Gestión Patrimonial",
      description: "Servicios personalizados para gestionar tu patrimonio",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/private/wealth-management"
    },
    {
      title: "Inversiones Exclusivas",
      description: "Acceso a oportunidades de inversión exclusivas",
      icon: <TrendingUp className="h-5 w-5" />,
      href: "/private/investments"
    },
    {
      title: "Planificación Fiscal",
      description: "Optimización fiscal para tu patrimonio",
      icon: <Shield className="h-5 w-5" />,
      href: "/private/tax-planning"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Banca Privada</h1>
          <p className="text-muted-foreground">Bienvenido a tu servicio exclusivo de banca privada</p>
        </div>
        <div className="flex gap-2">
          <Link to="/private/advisor">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Contactar Asesor
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="wealth">Patrimonio</TabsTrigger>
          <TabsTrigger value="investments">Inversiones</TabsTrigger>
          <TabsTrigger value="services">Servicios</TabsTrigger>
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
                <CardTitle>Evolución Patrimonial</CardTitle>
                <CardDescription>
                  Crecimiento de tu patrimonio en los últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <StatisticsChart monthlyData={monthlyData} />
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

          <div className="grid gap-4 md:grid-cols-3">
            {privateServices.map((service, index) => (
              <Link to={service.href} key={index}>
                <Card className="h-full hover:bg-accent/5 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wealth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión Patrimonial</CardTitle>
              <CardDescription>
                Análisis detallado de tu patrimonio y recomendaciones personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WealthManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cartera de Inversiones</CardTitle>
              <CardDescription>
                Gestión y seguimiento de tus inversiones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Módulo de inversiones en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Servicios Exclusivos</CardTitle>
              <CardDescription>
                Servicios personalizados para clientes de banca privada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Módulo de servicios exclusivos en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
