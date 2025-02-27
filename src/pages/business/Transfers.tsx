import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search, Building2, ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BusinessTransfers() {
  // Estado para el formulario de transferencia
  const [transferAmount, setTransferAmount] = useState("");
  const [transferType, setTransferType] = useState("internal");
  
  // Datos de ejemplo para las cuentas
  const accounts = [
    {
      id: "ACC-001",
      name: "Cuenta Corriente Principal",
      number: "****5678",
      balance: 45250.75,
      currency: "USD",
      type: "Corriente"
    },
    {
      id: "ACC-002",
      name: "Cuenta de Ahorros",
      number: "****1234",
      balance: 125000.00,
      currency: "USD",
      type: "Ahorros"
    },
    {
      id: "ACC-003",
      name: "Cuenta para Nómina",
      number: "****9876",
      balance: 28500.50,
      currency: "USD",
      type: "Corriente"
    },
    {
      id: "ACC-004",
      name: "Cuenta para Impuestos",
      number: "****5432",
      balance: 15750.25,
      currency: "USD",
      type: "Corriente"
    },
  ];

  // Datos de ejemplo para los beneficiarios
  const beneficiaries = [
    {
      id: "BEN-001",
      name: "Proveedor XYZ",
      accountNumber: "1234567890",
      bank: "Banco Nacional",
      type: "Proveedor",
      lastTransfer: "2025-02-15"
    },
    {
      id: "BEN-002",
      name: "Servicios ABC",
      accountNumber: "0987654321",
      bank: "Banco Internacional",
      type: "Servicios",
      lastTransfer: "2025-01-28"
    },
    {
      id: "BEN-003",
      name: "Consultor Financiero",
      accountNumber: "5678901234",
      bank: "Banco Nacional",
      type: "Consultor",
      lastTransfer: "2025-02-10"
    },
    {
      id: "BEN-004",
      name: "Arrendador Oficina",
      accountNumber: "3456789012",
      bank: "Banco Comercial",
      type: "Alquiler",
      lastTransfer: "2025-02-01"
    },
  ];

  // Datos de ejemplo para el historial de transferencias
  const transferHistory = [
    {
      id: "TRF-001",
      date: "2025-02-25",
      fromAccount: "Cuenta Corriente Principal",
      toAccount: "Proveedor XYZ",
      amount: 2500.00,
      description: "Pago de servicios mensuales",
      status: "Completada",
      type: "Externa"
    },
    {
      id: "TRF-002",
      date: "2025-02-20",
      fromAccount: "Cuenta Corriente Principal",
      toAccount: "Cuenta para Nómina",
      amount: 15000.00,
      description: "Transferencia para pago de nómina",
      status: "Completada",
      type: "Interna"
    },
    {
      id: "TRF-003",
      date: "2025-02-15",
      fromAccount: "Cuenta Corriente Principal",
      toAccount: "Servicios ABC",
      amount: 1250.50,
      description: "Pago de servicios de consultoría",
      status: "Completada",
      type: "Externa"
    },
    {
      id: "TRF-004",
      date: "2025-02-10",
      fromAccount: "Cuenta Corriente Principal",
      toAccount: "Cuenta para Impuestos",
      amount: 5000.00,
      description: "Reserva para impuestos",
      status: "Completada",
      type: "Interna"
    },
    {
      id: "TRF-005",
      date: "2025-02-28",
      fromAccount: "Cuenta Corriente Principal",
      toAccount: "Arrendador Oficina",
      amount: 3500.00,
      description: "Pago de alquiler mensual",
      status: "Programada",
      type: "Externa"
    },
  ];

  // Datos de ejemplo para transferencias programadas
  const scheduledTransfers = transferHistory.filter(transfer => transfer.status === "Programada");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Transferencias</h1>
          <p className="text-muted-foreground">Gestiona las transferencias de tu empresa</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Historial
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Programar Transferencia
          </Button>
        </div>
      </div>

      <Tabs defaultValue="new" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">Nueva Transferencia</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="scheduled">Programadas</TabsTrigger>
          <TabsTrigger value="beneficiaries">Beneficiarios</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Transferencia</CardTitle>
                <CardDescription>
                  Realiza una transferencia desde tus cuentas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo de Transferencia</Label>
                    <RadioGroup defaultValue="internal" className="flex gap-4" onValueChange={setTransferType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="internal" id="internal" />
                        <Label htmlFor="internal">Transferencia Interna</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="external" id="external" />
                        <Label htmlFor="external">Transferencia Externa</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cuenta de Origen</Label>
                    <Select defaultValue="acc-001">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cuenta" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.id.toLowerCase()}>
                            {account.name} (${account.balance.toLocaleString()})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      {transferType === "internal" ? "Cuenta de Destino" : "Beneficiario"}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={transferType === "internal" ? "Seleccionar cuenta" : "Seleccionar beneficiario"} />
                      </SelectTrigger>
                      <SelectContent>
                        {transferType === "internal" 
                          ? accounts.map(account => (
                              <SelectItem key={account.id} value={account.id.toLowerCase()}>
                                {account.name}
                              </SelectItem>
                            ))
                          : beneficiaries.map(beneficiary => (
                              <SelectItem key={beneficiary.id} value={beneficiary.id.toLowerCase()}>
                                {beneficiary.name} - {beneficiary.bank}
                              </SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Monto</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input
                        type="text"
                        placeholder="0.00"
                        className="pl-7"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Descripción</Label>
                    <Input placeholder="Descripción de la transferencia" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fecha de Transferencia</Label>
                    <Select defaultValue="now">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar fecha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Ahora</SelectItem>
                        <SelectItem value="tomorrow">Mañana</SelectItem>
                        <SelectItem value="next-week">Próxima semana</SelectItem>
                        <SelectItem value="custom">Fecha personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full mt-4">
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transferencias Frecuentes</CardTitle>
                <CardDescription>
                  Accede rápidamente a tus transferencias más comunes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transferHistory.slice(0, 3).map((transfer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/5 transition-colors cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{transfer.toAccount}</p>
                          <p className="text-sm text-muted-foreground">${transfer.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      Ver Todas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historial de Transferencias</CardTitle>
                <CardDescription>
                  Registro de todas tus transferencias
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar transferencia..."
                    className="pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las transferencias</SelectItem>
                    <SelectItem value="internal">Transferencias Internas</SelectItem>
                    <SelectItem value="external">Transferencias Externas</SelectItem>
                    <SelectItem value="completed">Completadas</SelectItem>
                    <SelectItem value="scheduled">Programadas</SelectItem>
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Desde</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Hacia</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Tipo</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transferHistory.map((transfer) => (
                        <tr key={transfer.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{transfer.date}</td>
                          <td className="p-4 align-middle">{transfer.fromAccount}</td>
                          <td className="p-4 align-middle">{transfer.toAccount}</td>
                          <td className="p-4 align-middle font-medium">{transfer.description}</td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              transfer.type === 'Interna' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {transfer.type}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-right">${transfer.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              transfer.status === 'Completada' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {transfer.status === 'Completada' ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {transfer.status}
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

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transferencias Programadas</CardTitle>
              <CardDescription>
                Transferencias pendientes de ejecución
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scheduledTransfers.length > 0 ? (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Desde</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Hacia</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduledTransfers.map((transfer) => (
                          <tr key={transfer.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">{transfer.date}</td>
                            <td className="p-4 align-middle">{transfer.fromAccount}</td>
                            <td className="p-4 align-middle">{transfer.toAccount}</td>
                            <td className="p-4 align-middle font-medium">{transfer.description}</td>
                            <td className="p-4 align-middle text-right">${transfer.amount.toLocaleString()}</td>
                            <td className="p-4 align-middle text-center">
                              <div className="flex justify-center gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  Cancelar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay transferencias programadas</h3>
                  <p className="text-muted-foreground mb-4">No tienes transferencias pendientes de ejecución</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Programar Transferencia
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beneficiaries" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Beneficiarios</CardTitle>
                <CardDescription>
                  Gestiona tus beneficiarios para transferencias
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Beneficiario
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cuenta</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Banco</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Tipo</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Última Transferencia</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beneficiaries.map((beneficiary) => (
                        <tr key={beneficiary.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{beneficiary.name}</td>
                          <td className="p-4 align-middle">{beneficiary.accountNumber}</td>
                          <td className="p-4 align-middle">{beneficiary.bank}</td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-700">
                              {beneficiary.type}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">{beneficiary.lastTransfer}</td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="outline" size="sm">
                                Transferir
                              </Button>
                              <Button variant="outline" size="sm">
                                Editar
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
