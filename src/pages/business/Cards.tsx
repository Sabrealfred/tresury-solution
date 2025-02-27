import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search, CreditCard, Lock, Unlock, Eye, EyeOff, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function BusinessCards() {
  // Datos de ejemplo para las tarjetas
  const cards = [
    {
      id: "CARD-001",
      name: "Tarjeta Corporativa Principal",
      number: "****5678",
      type: "Visa Business",
      holder: "Juan Pérez",
      expiryDate: "12/27",
      status: "Activa",
      limit: 10000.00,
      available: 7250.50,
      color: "bg-gradient-to-r from-blue-600 to-blue-800"
    },
    {
      id: "CARD-002",
      name: "Tarjeta Departamento Marketing",
      number: "****1234",
      type: "Mastercard Business",
      holder: "María González",
      expiryDate: "09/26",
      status: "Activa",
      limit: 5000.00,
      available: 3200.75,
      color: "bg-gradient-to-r from-purple-600 to-purple-800"
    },
    {
      id: "CARD-003",
      name: "Tarjeta Gastos Operativos",
      number: "****9876",
      type: "Visa Business",
      holder: "Carlos Rodríguez",
      expiryDate: "03/28",
      status: "Activa",
      limit: 7500.00,
      available: 4800.25,
      color: "bg-gradient-to-r from-green-600 to-green-800"
    },
    {
      id: "CARD-004",
      name: "Tarjeta Viajes",
      number: "****5432",
      type: "Mastercard Business",
      holder: "Ana Martínez",
      expiryDate: "06/27",
      status: "Bloqueada",
      limit: 8000.00,
      available: 8000.00,
      color: "bg-gradient-to-r from-gray-600 to-gray-800"
    },
  ];

  // Datos de ejemplo para las transacciones recientes
  const recentTransactions = [
    {
      id: "TRX-001",
      date: "2025-02-26",
      description: "Restaurante El Gourmet",
      amount: 125.50,
      card: "Tarjeta Corporativa Principal",
      category: "Comidas y Entretenimiento",
      status: "Completada"
    },
    {
      id: "TRX-002",
      date: "2025-02-25",
      description: "Publicidad en Redes Sociales",
      amount: 450.00,
      card: "Tarjeta Departamento Marketing",
      category: "Marketing",
      status: "Completada"
    },
    {
      id: "TRX-003",
      date: "2025-02-24",
      description: "Suministros de Oficina",
      amount: 320.75,
      card: "Tarjeta Gastos Operativos",
      category: "Suministros",
      status: "Completada"
    },
    {
      id: "TRX-004",
      date: "2025-02-23",
      description: "Suscripción Software",
      amount: 199.99,
      card: "Tarjeta Corporativa Principal",
      category: "Software",
      status: "Completada"
    },
    {
      id: "TRX-005",
      date: "2025-02-22",
      description: "Combustible",
      amount: 85.25,
      card: "Tarjeta Gastos Operativos",
      category: "Transporte",
      status: "Completada"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Tarjetas Empresariales</h1>
          <p className="text-muted-foreground">Gestiona las tarjetas de crédito y débito de tu empresa</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Solicitar Tarjeta
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cards">Tarjetas</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div className={`p-6 text-white ${card.color}`}>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="font-medium">{card.name}</h3>
                      <p className="text-sm opacity-80">{card.type}</p>
                    </div>
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="mb-4">
                    <p className="text-lg font-mono">{card.number}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="opacity-80">Titular</p>
                      <p>{card.holder}</p>
                    </div>
                    <div>
                      <p className="opacity-80">Expira</p>
                      <p>{card.expiryDate}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Límite:</span>
                      <span className="text-sm font-medium">${card.limit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Disponible:</span>
                      <span className="text-sm font-medium">${card.available.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estado:</span>
                      <span className={`text-sm font-medium ${card.status === 'Activa' ? 'text-green-600' : 'text-red-600'}`}>
                        {card.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      {card.status === 'Activa' ? (
                        <>
                          <Lock className="h-3 w-3 mr-1" />
                          Bloquear
                        </>
                      ) : (
                        <>
                          <Unlock className="h-3 w-3 mr-1" />
                          Desbloquear
                        </>
                      )}
                    </Button>
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
                <CardTitle>Resumen de Tarjetas</CardTitle>
                <CardDescription>
                  Información general sobre tus tarjetas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total de Tarjetas:</span>
                    <span>{cards.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tarjetas Activas:</span>
                    <span>{cards.filter(card => card.status === 'Activa').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tarjetas Bloqueadas:</span>
                    <span>{cards.filter(card => card.status === 'Bloqueada').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Límite Total:</span>
                    <span>${cards.reduce((sum, card) => sum + card.limit, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Disponible Total:</span>
                    <span>${cards.reduce((sum, card) => sum + card.available, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Gestiona tus tarjetas empresariales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Solicitar Nueva Tarjeta
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Estado de Cuenta
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Lock className="h-4 w-4 mr-2" />
                    Bloquear Todas las Tarjetas
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver PIN (Autenticación Requerida)
                  </Button>
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
                  Últimos movimientos con tus tarjetas empresariales
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
                    <SelectValue placeholder="Filtrar por tarjeta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las tarjetas</SelectItem>
                    {cards.map(card => (
                      <SelectItem key={card.id} value={card.id}>{card.name}</SelectItem>
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Tarjeta</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{transaction.date}</td>
                          <td className="p-4 align-middle font-medium">{transaction.description}</td>
                          <td className="p-4 align-middle">{transaction.card}</td>
                          <td className="p-4 align-middle">{transaction.category}</td>
                          <td className="p-4 align-middle text-right text-red-600">
                            <div className="flex items-center justify-end">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              ${transaction.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700">
                              {transaction.status}
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

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Tarjetas</CardTitle>
              <CardDescription>
                Gestiona la configuración y seguridad de tus tarjetas empresariales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Seguridad</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Compras en Línea</h4>
                      <p className="text-sm text-muted-foreground">Permitir compras en línea con tus tarjetas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Compras Internacionales</h4>
                      <p className="text-sm text-muted-foreground">Permitir compras en el extranjero</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Retiros en Cajeros</h4>
                      <p className="text-sm text-muted-foreground">Permitir retiros de efectivo en cajeros automáticos</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones de Transacciones</h4>
                      <p className="text-sm text-muted-foreground">Recibir notificaciones por cada transacción</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Límites</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Límite Diario de Compras</label>
                      <Select defaultValue="2000">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar límite" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000">$1,000</SelectItem>
                          <SelectItem value="2000">$2,000</SelectItem>
                          <SelectItem value="5000">$5,000</SelectItem>
                          <SelectItem value="10000">$10,000</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Límite Diario de Retiros</label>
                      <Select defaultValue="500">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar límite" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">$0 (Desactivado)</SelectItem>
                          <SelectItem value="500">$500</SelectItem>
                          <SelectItem value="1000">$1,000</SelectItem>
                          <SelectItem value="2000">$2,000</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Guardar Configuración</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
