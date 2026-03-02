#!/usr/bin/env node
/**
 * Archivo: ElHistorialDeNavegacion.js
 * Implementa una clase `Navegador` muy simple que usa pilas para gestionar
 * las funciones "Ir atrás" e "Ir adelante". Código con comentarios en español
 * para que cualquiera lo entienda.
 */

class Navegador {
  /**
   * Simula el historial del navegador de forma muy simple.
   *
   * Usa un arreglo para guardar el historial completo de páginas visitadas
   * y un índice (posición) para saber dónde estamos.
   *
   * Por ejemplo:
   *   historial = ["google.com", "youtube.com", "github.com"]
   *   posicion = 2  (estamos en "github.com", el último)
   */
  constructor() {
    // Arreglo que guardará todas las páginas visitadas
    this.historial = [];
    // Índice que indica dónde estamos (cuál página estamos viendo)
    this.posicion = -1;
  }

  visitar(url) {
    /**
     * Visitar una nueva URL.
     *
     * - Agrega la URL al final del historial.
     * - Movemos la posición al final (a esa URL).
     * - Si habíamos ido atrás, eliminamos todo lo que venía después
     *   (porque se crea un nuevo "futuro" al visitar algo nuevo).
     */
    if (this.posicion < this.historial.length - 1) {
      this.historial = this.historial.slice(0, this.posicion + 1);
    }
    this.historial.push(url);
    this.posicion++;
  }

  irAtras() {
    /**
     * Ir a la página anterior (disminuir la posición).
     *
     * Devuelve la página a la que fuimos, o null si no hay antes.
     */
    if (this.posicion <= 0) {
      return null;
    }
    this.posicion--;
    return this.historial[this.posicion];
  }

  irAdelante() {
    /**
     * Ir a la página siguiente (aumentar la posición).
     *
     * Devuelve la página a la que fuimos, o null si no hay después.
     */
    if (this.posicion >= this.historial.length - 1) {
      return null;
    }
    this.posicion++;
    return this.historial[this.posicion];
  }

  obtenerActual() {
    /**
     * Retorna la URL actual (o null si no hay ninguna).
     */
    if (this.posicion >= 0 && this.posicion < this.historial.length) {
      return this.historial[this.posicion];
    }
    return null;
  }
}

// Menú interactivo en consola
function menuInteractivo() {
  const nav = new Navegador();
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n" + "=".repeat(60));
  console.log("🌐 NAVEGADOR INTERACTIVO");
  console.log("=".repeat(60));
  console.log("Prueba cómo funciona el historial con Pilas.\n");

  function mostrarMenu() {
    if (nav.obtenerActual()) {
      console.log(`\n📍 Página actual: ${nav.obtenerActual()}`);
      console.log(`   Historial: ${JSON.stringify(nav.historial)}`);
      console.log(`   Posición: ${nav.posicion}`);
    } else {
      console.log("\n📍 No has visitado ninguna página aún");
    }

    console.log("\n" + "-".repeat(60));
    console.log("MENÚ:");
    console.log("  1. Visitar una URL");
    console.log("  2. Ir atrás");
    console.log("  3. Ir adelante");
    console.log("  4. Ver historial completo");
    console.log("  5. Salir");
    console.log("-".repeat(60));

    rl.question("Elige una opción (1-5): ", (opcion) => {
      if (opcion === "1") {
        rl.question("\n--- Visitar URL ---\nEscribe la URL a visitar: ", (url) => {
          if (url.trim()) {
            nav.visitar(url.trim());
            console.log(`✓ Visitaste: ${url}`);
          } else {
            console.log("❌ URL vacía. Intenta de nuevo.");
          }
          mostrarMenu();
        });
      } else if (opcion === "2") {
        console.log("\n--- Ir Atrás ---");
        const resultado = nav.irAtras();
        if (resultado) {
          console.log(`✓ Fuiste atrás a: ${resultado}`);
        } else {
          console.log("❌ No puedes ir más atrás (estás al principio)");
        }
        mostrarMenu();
      } else if (opcion === "3") {
        console.log("\n--- Ir Adelante ---");
        const resultado = nav.irAdelante();
        if (resultado) {
          console.log(`✓ Avanzaste a: ${resultado}`);
        } else {
          console.log("❌ No puedes ir más adelante");
        }
        mostrarMenu();
      } else if (opcion === "4") {
        console.log("\n--- Historial Completo ---");
        if (nav.historial.length > 0) {
          console.log(`Total de páginas visitadas: ${nav.historial.length}`);
          nav.historial.forEach((pagina, i) => {
            const marca = i === nav.posicion ? " <-- TÚ ESTÁS AQUÍ" : "";
            console.log(`  ${i + 1}. ${pagina}${marca}`);
          });
        } else {
          console.log("El historial está vacío");
        }
        mostrarMenu();
      } else if (opcion === "5") {
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