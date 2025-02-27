import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, FileText, TrendingUp } from "lucide-react";

// Datos de ejemplo para la distribución de activos
const assetAllocationData = [
  { name: "Renta Variable", value: 45, color: "#8b5cf6" },
  { name: "Renta Fija", value: 25, color: "#3b82f6" },
  { name: "Inmobiliario", value: 15, color: "#10b981" },
  { name: "Alternativos", value: 10, color: "#f59e0b" },
  { name: "Liquidez", value: 5, color: "#6b7280" },
];

// Datos de ejemplo para el rendimiento por clase de activo
const performanceData = [
  { asset: "Renta Variable", ytd: "+12.5%", year1: "+18.2%", year3: "+45.7%" },
  { asset: "Renta Fija", ytd: "+3.2%", year1: "+5.1%", year3: "+12.3%" },
  { asset: "Inmobiliario", ytd: "+4.8%", year1: "+7.3%", year3: "+22.1%" },
  { asset: "Alternativos", ytd: "+8.7%", year1: "+14.2%", year3: "+32.5%" },
  { asset: "Total Cartera", ytd: "+8.3%", year1: "+12.7%", year3: "+31.8%" },
];

// Datos de ejemplo para las recomendaciones personalizadas
const recommendations = [
  {
    title: "Diversificación Geográfica",
    description: "Considerar aumentar exposición a mercados emergentes para mejorar la diversificación",
    action: "Ver oportunidades"
  },
  {
    title: "Rebalanceo de Cartera",
    description: "Recomendamos rebalancear la cartera para mantener la asignación estratégica",
    action: "Programar rebalanceo"
  },
  {
    title: "Planificación Fiscal",
    description: "Optimizar la estructura fiscal de tus inversiones antes del cierre fiscal",
    action: "Consultar asesor"
  }
];

export function WealthManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Resumen Patrimonial</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Ver Informe
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Distribución de Activos */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Distribución de Activos</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Asignación']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Rendimiento por Clase de Activo */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Rendimiento por Clase de Activo</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Clase de Activo</th>
                    <th className="text-right py-2 font-medium">YTD</th>
                    <th className="text-right py-2 font-medium">1 Año</th>
                    <th className="text-right py-2 font-medium">3 Años</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((item, index) => (
                    <tr key={index} className={index === performanceData.length - 1 ? "font-semibold" : ""}>
                      <td className="py-2">{item.asset}</td>
                      <td className={`text-right py-2 ${item.ytd.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {item.ytd}
                      </td>
                      <td className={`text-right py-2 ${item.year1.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {item.year1}
                      </td>
                      <td className={`text-right py-2 ${item.year3.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {item.year3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones Personalizadas */}
      <div>
        <h3 className="text-lg font-medium mb-4">Recomendaciones Personalizadas</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="font-medium">{rec.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  {rec.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
