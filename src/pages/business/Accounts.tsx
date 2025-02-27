import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search, CreditCard, Building2, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessAccounts() {
  // Datos de ejemplo para las cuentas
  const accounts = [
    {
      id: "ACC-001",
      name: "Cuenta Corriente Principal",
      number: "****5678",
      balance: 45250.75,
      currency: "USD",
      type: "Corriente",
      status: "Activa"
    },
    {
      id: "ACC-002",
      name: "Cuenta de Ahorros",
      number: "****1234",
      balance: 125000.00,
      currency: "USD",
      type: "Ahorros",
      status: "Activa"
    },
    {
      id: "ACC-003",
      name: "Cuenta para Nómina",
      number: "****9876",
      balance: 28500.50,
      currency: "USD",
      type: "Corriente",
      status: "Activa"
    },
    {
      id: "ACC-004",
      name: "Cuenta para Impuestos",
      number: "****5432",
      balance: 15750.25,
      currency: "USD",
      type: "Corriente",
      status: "Activa"
    },
  ];

  // Datos de ejemplo para las transacciones recientes
  const recentTransactions = [
    {
      id: "TRX-001",
      date: "2025-02-26",
      description: "Pago a Proveedor XYZ",
      amount: -2500.00,
      account: "Cuenta Corriente Principal",
      category: "Gastos Operativos",
      type: "outgoing"
    },
    {
      id: "TRX-002",
      date: "2025-02-25",
      description: "Cobro de Factura #INV-2023-004",
      amount: 4750.00,
      account: "Cuenta Corriente Principal",
      category: "Ingresos",
      type: "incoming"
    },
    {
      id: "TRX-003",
      date: "2025-02-24",
      description: "Transferencia a Cuenta de Nómina",
      amount: -15000.00,
      account: "Cuenta Corriente Principal",
      category: "Transferencia Interna",
      type: "outgoing"
    },
    {
      id: "TRX-004",
      date: "2025-02-24",
      description: "Transferencia desde Cuenta Principal",
      amount: 15000.00,
      account: "Cuenta para Nómina",
      category: "Transferencia Interna",
      type: "incoming"
    },
    {
      id: "TRX-005",
      date: "2025-02-23",
      description: "Pago de Servicios",
      amount: -850.25,
      account: "Cuenta Corriente Principal",
      category: "Servicios",
      type: "outgoing"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Gestión de Cuentas</h1>
          <p className="text-muted-foreground">Administra tus cuentas empresariales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cuenta
          </Button>
        </div>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Cuentas</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones Recientes</TabsTrigger>
          <TabsTrigger value="statements">Estados de Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {accounts.map((account) => (
              <Card key={account.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <CardDescription>
                    {account.number} • {account.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">${account.balance.toLocaleString()}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{account.currency}</span>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Operaciones comunes para tus cuentas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Building2 className="h-5 w-5 mb-1" />
                    <span>Transferir</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span>Pagar</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Download className="h-5 w-5 mb-1" />
                    <span>Descargar Estado</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Plus className="h-5 w-5 mb-1" />
                    <span>Añadir Cuenta</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de Cuentas</CardTitle>
                <CardDescription>
                  Balance total y distribución
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Balance Total</h3>
                    <div className="text-3xl font-bold mt-2">
                      ${accounts.reduce((sum, account) => sum + account.balance, 0).toLocaleString()}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Distribución por Tipo</h3>
                    <div className="space-y-2">
                      {['Corriente', 'Ahorros'].map(type => {
                        const total = accounts
                          .filter(account => account.type === type)
                          .reduce((sum, account) => sum + account.balance, 0);
                        
                        return (
                          <div key={type} className="flex justify-between items-center">
                            <span className="text-sm">{type}</span>
                            <span className="text-sm font-medium">${total.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transacciones Recientes</CardTitle>
                <CardDescription>
                  Últimos movimientos en tus cuentas
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
                    {accounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                    ))}
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cuenta</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{transaction.date}</td>
                          <td className="p-4 align-middle font-medium">{transaction.description}</td>
                          <td className="p-4 align-middle">{transaction.account}</td>
                          <td className="p-4 align-middle">{transaction.category}</td>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estados de Cuenta</CardTitle>
              <CardDescription>
                Descarga los estados de cuenta de tus cuentas empresariales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <Select defaultValue="acc-001">
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Seleccionar cuenta" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.id.toLowerCase()}>{account.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="2025-02">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar periodo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025-02">Febrero 2025</SelectItem>
                        <SelectItem value="2025-01">Enero 2025</SelectItem>
                        <SelectItem value="2024-12">Diciembre 2024</SelectItem>
                        <SelectItem value="2024-11">Noviembre 2024</SelectItem>
                        <SelectItem value="2024-10">Octubre 2024</SelectItem>
                        <SelectItem value="2024-09">Septiembre 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Estado
                  </Button>
                </div>
                
                <div className="rounded-md border p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Estado de Cuenta</h3>
                  <p className="text-muted-foreground mb-4">Cuenta Corriente Principal • Febrero 2025</p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      CSV
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
