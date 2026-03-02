#!/usr/bin/env node
/**
 * Archivo: GestorDeImpresion-Pedidos.js
 * Implementa una Cola simple para procesar peticiones de una "API" en orden de llegada.
 * Código muy fácil de entender con comentarios en español.
 */

class GestorDeImpresion {
  /**
   * Gestiona una cola de peticiones de impresión.
   *
   * Usa un arreglo como cola (FIFO: primero que entra, primero que sale)
   * para procesar peticiones en el orden exacto en que llegan.
   */
  constructor() {
    this.cola = []; // Cola de peticiones
    this.contadorPeticiones = 0; // Contador para IDs únicos
  }

  recibirPeticion(documento, copias = 1) {
    /**
     * Recibir una nueva petición de impresión (simula API).
     *
     * Parámetros:
     *   documento (string): Nombre del documento a imprimir
     *   copias (number): Cuántas copias imprimir (default 1)
     *
     * La petición se agrega al final de la cola.
     */
    this.contadorPeticiones++;
    const hora = new Date().toLocaleTimeString("es-CO", { hour12: false });
    const peticion = {
      id: this.contadorPeticiones,
      documento,
      copias,
      hora,
    };
    this.cola.push(peticion);
    console.log(`✓ Petición #${peticion.id} recibida: ${documento} (${copias} copias)`);
  }

  procesarPeticion() {
    /**
     * Procesar la siguiente petición de la cola.
     *
     * Toma la petición del inicio de la cola (FIFO).
     * Devuelve null si la cola está vacía.
     */
    if (this.cola.length === 0) {
      console.log("⚠ No hay peticiones en la cola");
      return null;
    }

    const peticion = this.cola.shift(); // shift() = sacar del inicio de la cola
    console.log(`\n▶ Procesando petición #${peticion.id}`);
    console.log(`  Documento: ${peticion.documento}`);
    console.log(`  Copias: ${peticion.copias}`);
    console.log(`  Hora de llegada: ${peticion.hora}`);
    console.log("  ✓ Impresión completada");
    return peticion;
  }

  verCola() {
    /**
     * Mostrar todas las peticiones que están esperando en la cola.
     */
    if (this.cola.length === 0) {
      console.log("\nLa cola está vacía");
      return;
    }

    console.log(`\n📋 Cola (${this.cola.length} peticiones en espera):`);
    this.cola.forEach((peticion, i) => {
      console.log(`  ${i + 1}. #${peticion.id} - ${peticion.documento} (${peticion.copias} copias)`);
    });
  }

  cantidadEnCola() {
    /**
     * Retorna cuántas peticiones hay esperando.
     */
    return this.cola.length;
  }
}

// Menú interactivo en consola
function menuInteractivo() {
  const gestor = new GestorDeImpresion();
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n" + "=".repeat(60));
  console.log("🖨️  GESTOR DE IMPRESIÓN CON COLA");
  console.log("=".repeat(60));
  console.log("Bienvenido. Prueba cómo funciona la cola FIFO.\n");

  function mostrarMenu() {
    console.log("\n" + "-".repeat(60));
    console.log("MENÚ:");
    console.log("  1. Agregar una petición de impresión");
    console.log("  2. Ver cola de espera");
    console.log("  3. Procesar siguiente petición");
    console.log("  4. Salir");
    console.log("-".repeat(60));

    rl.question("Elige una opción (1-4): ", (opcion) => {
      if (opcion === "1") {
        console.log("\n--- Agregar Petición ---");
        rl.question("Nombre del documento: ", (documento) => {
          if (!documento.trim()) {
            documento = "Documento sin nombre";
          }
          rl.question("Número de copias (default 1): ", (copiasStr) => {
            let copias = parseInt(copiasStr.trim() || "1", 10);
            if (isNaN(copias) || copias < 1) {
              copias = 1;
            }
            gestor.recibirPeticion(documento, copias);
            mostrarMenu();
          });
        });
      } else if (opcion === "2") {
        gestor.verCola();
        mostrarMenu();
      } else if (opcion === "3") {
        gestor.procesarPeticion();
        mostrarMenu();
      } else if (opcion === "4") {
        console.log("\n👋 ¡Hasta luego!");
        rl.close();
      } else {
        console.log("❌ Opción no válida. Intenta de nuevo.");
        mostrarMenu();
      }
    });
  }

  mostrarMenu();
}

if (require.main === module) {
  menuInteractivo();
}