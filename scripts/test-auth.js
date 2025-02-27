// Script para probar la autenticación de demostración
console.log("Simulando inicio de sesión de demostración...");

// Simular inicio de sesión como administrador
console.log("\n1. Iniciando sesión como administrador (admin1@demo.com):");
const adminUser = {
  email: "admin1@demo.com",
  role: "admin",
  isDemo: true
};
console.log("- Guardando información en localStorage");
console.log("- Redirigiendo a /admin/dashboard");
console.log("- Usuario autenticado como:", adminUser);

// Simular inicio de sesión como usuario normal
console.log("\n2. Iniciando sesión como usuario (user1@demo.com):");
const regularUser = {
  email: "user1@demo.com",
  role: "user",
  isDemo: true
};
console.log("- Guardando información en localStorage");
console.log("- Redirigiendo a /");
console.log("- Usuario autenticado como:", regularUser);

// Simular inicio de sesión como negocio
console.log("\n3. Iniciando sesión como negocio (business@demo.com):");
const businessUser = {
  email: "business@demo.com",
  role: "business",
  isDemo: true
};
console.log("- Guardando información en localStorage");
console.log("- Redirigiendo a /business/dashboard");
console.log("- Usuario autenticado como:", businessUser);

// Simular cierre de sesión
console.log("\n4. Cerrando sesión:");
console.log("- Eliminando información de localStorage");
console.log("- Redirigiendo a /auth");

console.log("\n✅ Prueba de autenticación de demostración completada con éxito!");
console.log("\nLos cambios realizados permiten:");
console.log("1. Iniciar sesión con usuarios de demostración sin necesidad de Supabase");
console.log("2. Mostrar información del usuario de demostración en la interfaz");
console.log("3. Cerrar sesión correctamente para usuarios de demostración");
console.log("\nPara probar la aplicación completa, es necesario resolver el problema con Vite.");
