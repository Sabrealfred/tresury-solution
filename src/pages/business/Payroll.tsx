import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Plus, Search, Users, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessPayroll() {
  // Datos de ejemplo para los empleados
  const employees = [
    {
      id: "EMP-001",
      name: "Juan Pérez",
      position: "Gerente de Ventas",
      department: "Ventas",
      salary: 4500.00,
      bankAccount: "****5678",
      status: "Activo"
    },
    {
      id: "EMP-002",
      name: "María González",
      position: "Desarrollador Senior",
      department: "Tecnología",
      salary: 3800.00,
      bankAccount: "****1234",
      status: "Activo"
    },
    {
      id: "EMP-003",
      name: "Carlos Rodríguez",
      position: "Contador",
      department: "Finanzas",
      salary: 3200.00,
      bankAccount: "****9876",
      status: "Activo"
    },
    {
      id: "EMP-004",
      name: "Ana Martínez",
      position: "Asistente Administrativo",
      department: "Administración",
      salary: 2500.00,
      bankAccount: "****5432",
      status: "Activo"
    },
    {
      id: "EMP-005",
      name: "Roberto Sánchez",
      position: "Diseñador Gráfico",
      department: "Marketing",
      salary: 3000.00,
      bankAccount: "****7890",
      status: "Activo"
    },
  ];

  // Datos de ejemplo para los pagos de nómina
  const payrollPayments = [
    {
      id: "PAY-001",
      date: "2025-02-15",
      period: "Febrero 2025 (1-15)",
      totalAmount: 17000.00,
      employeeCount: 5,
      status: "Completado",
      processedBy: "Sistema Automático"
    },
    {
      id: "PAY-002",
      date: "2025-01-31",
      period: "Enero 2025 (16-31)",
      totalAmount: 17000.00,
      employeeCount: 5,
      status: "Completado",
      processedBy: "Sistema Automático"
    },
    {
      id: "PAY-003",
      date: "2025-01-15",
      period: "Enero 2025 (1-15)",
      totalAmount: 17000.00,
      employeeCount: 5,
      status: "Completado",
      processedBy: "Sistema Automático"
    },
    {
      id: "PAY-004",
      date: "2025-02-28",
      period: "Febrero 2025 (16-28)",
      totalAmount: 17000.00,
      employeeCount: 5,
      status: "Programado",
      processedBy: "Pendiente"
    },
  ];

  // Datos de ejemplo para los pagos de impuestos
  const taxPayments = [
    {
      id: "TAX-001",
      date: "2025-01-20",
      period: "Diciembre 2024",
      type: "Seguridad Social",
      amount: 5100.00,
      status: "Pagado",
      reference: "SS-DIC-2024"
    },
    {
      id: "TAX-002",
      date: "2025-01-20",
      period: "Diciembre 2024",
      type: "Retención de Impuestos",
      amount: 4250.00,
      status: "Pagado",
      reference: "IRPF-DIC-2024"
    },
    {
      id: "TAX-003",
      date: "2025-02-20",
      period: "Enero 2025",
      type: "Seguridad Social",
      amount: 5100.00,
      status: "Pendiente",
      reference: "SS-ENE-2025"
    },
    {
      id: "TAX-004",
      date: "2025-02-20",
      period: "Enero 2025",
      type: "Retención de Impuestos",
      amount: 4250.00,
      status: "Pendiente",
      reference: "IRPF-ENE-2025"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Nómina</h1>
          <p className="text-muted-foreground">Gestiona la nómina de tus empleados</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendario de Pagos
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Procesar Nómina
          </Button>
        </div>
      </div>

      {/* Resumen de Nómina */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <div className="text-2xl font-bold">5</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Empleados activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nómina Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34,000.00</div>
            <p className="text-xs text-muted-foreground mt-1">Total mensual bruto</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28/02/2025</div>
            <p className="text-xs text-muted-foreground mt-1">$17,000.00 (2ª quincena)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impuestos Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,350.00</div>
            <p className="text-xs text-muted-foreground mt-1">Vencimiento: 20/02/2025</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Empleados</TabsTrigger>
          <TabsTrigger value="payments">Pagos de Nómina</TabsTrigger>
          <TabsTrigger value="taxes">Impuestos</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Listado de Empleados</CardTitle>
                <CardDescription>
                  Gestiona la información de tus empleados
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Empleado
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar empleado..."
                    className="pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los departamentos</SelectItem>
                      <SelectItem value="sales">Ventas</SelectItem>
                      <SelectItem value="tech">Tecnología</SelectItem>
                      <SelectItem value="finance">Finanzas</SelectItem>
                      <SelectItem value="admin">Administración</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cargo</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Departamento</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Salario</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Cuenta Bancaria</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{employee.id}</td>
                          <td className="p-4 align-middle">{employee.name}</td>
                          <td className="p-4 align-middle">{employee.position}</td>
                          <td className="p-4 align-middle">{employee.department}</td>
                          <td className="p-4 align-middle text-right">${employee.salary.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{employee.bankAccount}</td>
                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700">
                              {employee.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm">
                                Ver Historial
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

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pagos de Nómina</CardTitle>
                <CardDescription>
                  Historial y programación de pagos de nómina
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Calendario
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Pago
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Periodo</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto Total</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Empleados</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payrollPayments.map((payment) => (
                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{payment.id}</td>
                          <td className="p-4 align-middle">{payment.date}</td>
                          <td className="p-4 align-middle">{payment.period}</td>
                          <td className="p-4 align-middle text-right">${payment.totalAmount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{payment.employeeCount}</td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              payment.status === 'Completado' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {payment.status === 'Completado' ? (
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
                                Detalles
                              </Button>
                              {payment.status === 'Programado' && (
                                <Button variant="ghost" size="sm">
                                  Editar
                                </Button>
                              )}
                              {payment.status === 'Completado' && (
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-3 w-3 mr-1" />
                                  Recibos
                                </Button>
                              )}
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

        <TabsContent value="taxes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Impuestos y Contribuciones</CardTitle>
                <CardDescription>
                  Gestión de impuestos relacionados con la nómina
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Pago
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Periodo</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Monto</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Referencia</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-center align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxPayments.map((tax) => (
                        <tr key={tax.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{tax.id}</td>
                          <td className="p-4 align-middle">{tax.date}</td>
                          <td className="p-4 align-middle">{tax.period}</td>
                          <td className="p-4 align-middle">{tax.type}</td>
                          <td className="p-4 align-middle text-right">${tax.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle text-center">{tax.reference}</td>
                          <td className="p-4 align-middle text-center">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                              tax.status === 'Pagado' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {tax.status === 'Pagado' ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {tax.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Detalles
                              </Button>
                              {tax.status === 'Pendiente' && (
                                <Button variant="ghost" size="sm">
                                  Pagar
                                </Button>
                              )}
                              {tax.status === 'Pagado' && (
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-3 w-3 mr-1" />
                                  Comprobante
                                </Button>
                              )}
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

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informes de Nómina</CardTitle>
              <CardDescription>
                Informes y documentación relacionada con la nómina
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Informe de Nómina Mensual</h3>
                        <p className="text-sm text-muted-foreground">Enero 2025</p>
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
                        <h3 className="font-medium">Resumen de Impuestos</h3>
                        <p className="text-sm text-muted-foreground">Enero 2025</p>
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
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Informe de Costos Laborales</h3>
                        <p className="text-sm text-muted-foreground">Enero 2025</p>
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
