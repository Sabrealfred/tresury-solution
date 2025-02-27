import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Plus, Search, ArrowRight, FileText, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function BusinessLoans() {
  // Datos de ejemplo para los préstamos
  const loans = [
    {
      id: "LOAN-001",
      name: "Préstamo para Expansión",
      amount: 50000.00,
      interestRate: 5.25,
      term: 60,
      remainingTerm: 48,
      monthlyPayment: 950.15,
      totalPaid: 11401.80,
      remainingAmount: 45598.20,
      nextPaymentDate: "2025-03-15",
      status: "Activo"
    },
    {
      id: "LOAN-002",
      name: "Préstamo para Equipamiento",
      amount: 25000.00,
      interestRate: 4.75,
      term: 36,
      remainingTerm: 24,
      monthlyPayment: 750.25,
      totalPaid: 9003.00,
      remainingAmount: 18000.00,
      nextPaymentDate: "2025-03-10",
      status: "Activo"
    },
    {
      id: "LOAN-003",
      name: "Línea de Crédito Operativa",
      amount: 15000.00,
      interestRate: 6.50,
      term: 12,
      remainingTerm: 0,
      monthlyPayment: 0,
      totalPaid: 15975.00,
      remainingAmount: 0,
      nextPaymentDate: "",
      status: "Pagado"
    },
    {
      id: "LOAN-004",
      name: "Préstamo para Inventario",
      amount: 30000.00,
      interestRate: 5.00,
      term: 24,
      remainingTerm: 18,
      monthlyPayment: 1315.50,
      totalPaid: 7893.00,
      remainingAmount: 23650.00,
      nextPaymentDate: "2025-03-05",
      status: "Activo"
    },
  ];

  // Datos de ejemplo para ofertas de préstamos
  const loanOffers = [
    {
      id: "OFFER-001",
      name: "Préstamo para Pequeñas Empresas",
      minAmount: 10000.00,
      maxAmount: 100000.00,
      interestRate: 5.25,
      minTerm: 12,
      maxTerm: 60,
      requirements: [
        "Negocio operando por al menos 2 años",
        "Ingresos anuales mínimos de $100,000",
        "Buen historial crediticio"
      ]
    },
    {
      id: "OFFER-002",
      name: "Línea de Crédito Empresarial",
      minAmount: 5000.00,
      maxAmount: 50000.00,
      interestRate: 6.75,
      minTerm: 6,
      maxTerm: 24,
      requirements: [
        "Negocio operando por al menos 1 año",
        "Ingresos anuales mínimos de $75,000",
        "Historial crediticio aceptable"
      ]
    },
    {
      id: "OFFER-003",
      name: "Préstamo para Equipamiento",
      minAmount: 15000.00,
      maxAmount: 200000.00,
      interestRate: 4.50,
      minTerm: 24,
      maxTerm: 84,
      requirements: [
        "Negocio operando por al menos 3 años",
        "Ingresos anuales mínimos de $150,000",
        "Buen historial crediticio",
        "El equipo sirve como garantía"
      ]
    },
  ];

  // Datos de ejemplo para pagos programados
  const scheduledPayments = [
    {
      id: "PAY-001",
      loanId: "LOAN-001",
      loanName: "Préstamo para Expansión",
      amount: 950.15,
      dueDate: "2025-03-15",
      status: "Programado"
    },
    {
      id: "PAY-002",
      loanId: "LOAN-002",
      loanName: "Préstamo para Equipamiento",
      amount: 750.25,
      dueDate: "2025-03-10",
      status: "Programado"
    },
    {
      id: "PAY-003",
      loanId: "LOAN-004",
      loanName: "Préstamo para Inventario",
      amount: 1315.50,
      dueDate: "2025-03-05",
      status: "Programado"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Préstamos</h1>
          <p className="text-muted-foreground">Gestiona tus préstamos y solicita financiamiento</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendario de Pagos
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Solicitar Préstamo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Préstamos Activos</TabsTrigger>
          <TabsTrigger value="offers">Ofertas de Préstamos</TabsTrigger>
          <TabsTrigger value="payments">Pagos Programados</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loans.filter(loan => loan.status === "Activo").map((loan) => (
              <Card key={loan.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{loan.name}</CardTitle>
                  <CardDescription>
                    {loan.id} • {loan.term} meses • {loan.interestRate}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monto original:</span>
                      <span className="text-sm font-medium">${loan.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monto restante:</span>
                      <span className="text-sm font-medium">${loan.remainingAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pago mensual:</span>
                      <span className="text-sm font-medium">${loan.monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Próximo pago:</span>
                      <span className="text-sm font-medium">{loan.nextPaymentDate}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>{Math.round((loan.term - loan.remainingTerm) / loan.term * 100)}%</span>
                    </div>
                    <Progress value={(loan.term - loan.remainingTerm) / loan.term * 100} className="h-2" />
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Préstamos</CardTitle>
              <CardDescription>
                Información detallada de todos tus préstamos activos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto Original</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto Restante</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Tasa</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Plazo Restante</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Pago Mensual</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Próximo Pago</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.filter(loan => loan.status === "Activo").map((loan) => (
                        <tr key={loan.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{loan.id}</td>
                          <td className="p-4 align-middle">{loan.name}</td>
                          <td className="p-4 align-middle text-right">${loan.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-right">${loan.remainingAmount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{loan.interestRate}%</td>
                          <td className="p-4 align-middle text-center">{loan.remainingTerm} meses</td>
                          <td className="p-4 align-middle text-right">${loan.monthlyPayment.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{loan.nextPaymentDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {loanOffers.map((offer) => (
              <Card key={offer.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{offer.name}</CardTitle>
                  <CardDescription>
                    Tasa de interés: {offer.interestRate}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Detalles del Préstamo</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Monto:</span>
                          <span className="text-sm">${offer.minAmount.toLocaleString()} - ${offer.maxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Plazo:</span>
                          <span className="text-sm">{offer.minTerm} - {offer.maxTerm} meses</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tasa de interés:</span>
                          <span className="text-sm">{offer.interestRate}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Requisitos</h4>
                      <ul className="text-sm space-y-1">
                        {offer.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="h-3 w-3 mr-2 mt-1 text-primary" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full">
                    Solicitar Ahora
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Programados</CardTitle>
              <CardDescription>
                Próximos pagos de tus préstamos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID de Pago</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Préstamo</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Fecha de Vencimiento</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledPayments.map((payment) => (
                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{payment.id}</td>
                          <td className="p-4 align-middle">
                            <div>
                              <div>{payment.loanName}</div>
                              <div className="text-xs text-muted-foreground">{payment.loanId}</div>
                            </div>
                          </td>
                          <td className="p-4 align-middle text-right">${payment.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{payment.dueDate}</td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-700">
                              <Clock className="h-3 w-3 mr-1" />
                              {payment.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <Button variant="outline" size="sm">
                              Pagar Ahora
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

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Préstamos</CardTitle>
              <CardDescription>
                Préstamos completados y pagos realizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto Original</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Tasa</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Plazo</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Total Pagado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.filter(loan => loan.status === "Pagado").map((loan) => (
                        <tr key={loan.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{loan.id}</td>
                          <td className="p-4 align-middle">{loan.name}</td>
                          <td className="p-4 align-middle text-right">${loan.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{loan.interestRate}%</td>
                          <td className="p-4 align-middle text-center">{loan.term} meses</td>
                          <td className="p-4 align-middle text-right">${loan.totalPaid.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700">
                              {loan.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Certificado
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
      </Tabs>
    </div>
  );
}
