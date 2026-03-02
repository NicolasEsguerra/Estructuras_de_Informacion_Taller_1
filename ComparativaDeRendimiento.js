#!/usr/bin/env node
/**
 * Archivo: ComparativaDeRendimiento.js
 * Compara el tiempo de insertar 100,000 elementos al inicio de un Array
 * vs. insertar al final. Código muy simple con comentarios en español.
 */

function insertarAlInicio() {
  /**
   * Insertar 100,000 números al INICIO de un arreglo.
   *
   * Usa array.unshift(elemento) para poner cada elemento al principio.
   * Esto es LENTO porque todos los elementos previos deben moverse.
   */
  const lista = [];

  // Medir el tiempo inicial
  const tiempoInicio = Date.now();

  // Insertar 100,000 números al inicio
  for (let i = 0; i < 100000; i++) {
    lista.unshift(i); // Insertar siempre al inicio
  }

  // Medir el tiempo final
  const tiempoFin = Date.now();

  // Calcular cuánto tiempo tomó (en segundos)
  const tiempoTotal = (tiempoFin - tiempoInicio) / 1000;

  return tiempoTotal;
}

function insertarAlFinal() {
  /**
   * Insertar 100,000 números al FINAL de un arreglo.
   *
   * Usa array.push(elemento) para agregar cada elemento al final.
   * Esto es RÁPIDO porque no hay que mover nada.
   */
  const lista = [];

  // Medir el tiempo inicial
  const tiempoInicio = Date.now();

  // Insertar 100,000 números al final
  for (let i = 0; i < 100000; i++) {
    lista.push(i); // Agregar siempre al final
  }

  // Medir el tiempo final
  const tiempoFin = Date.now();

  // Calcular cuánto tiempo tomó (en segundos)
  const tiempoTotal = (tiempoFin - tiempoInicio) / 1000;

  return tiempoTotal;
}

function mostrarComparativa() {
  /**
   * Ejecutar ambas pruebas y mostrar la comparación.
   *
   * Esto demostrará cuánto más lento es insertar al inicio
   * que insertar al final.
   */
  console.log("\n" + "=".repeat(70));
  console.log("⏱️  COMPARATIVA DE RENDIMIENTO: INSERTAR AL INICIO vs AL FINAL");
  console.log("=".repeat(70));

  // Prueba 1: Insertar al final (RÁPIDO)
  console.log("\n📊 PRUEBA 1: Insertar 100,000 elementos al FINAL");
  console.log("-".repeat(70));
  console.log("Usando: array.push(elemento)");
  console.log("Esto es rápido porque no hay que mover elementos...");
  const tiempoFinal = insertarAlFinal();
  console.log(`✓ Tiempo: ${tiempoFinal.toFixed(4)} segundos`);

  // Prueba 2: Insertar al inicio (LENTO)
  console.log("\n📊 PRUEBA 2: Insertar 100,000 elementos al INICIO");
  console.log("-".repeat(70));
  console.log("Usando: array.unshift(elemento)");
  console.log("Esto es lento porque CADA elemento debe moverse de posición...");
  const tiempoInicio = insertarAlInicio();
  console.log(`✓ Tiempo: ${tiempoInicio.toFixed(4)} segundos`);

  // Mostrar la comparación
  console.log("\n" + "=".repeat(70));
  console.log("📈 COMPARACIÓN Y ANÁLISIS");
  console.log("=".repeat(70));
  console.log(`Tiempo insertar al FINAL:   ${tiempoFinal.toFixed(4)} segundos`);
  console.log(`Tiempo insertar al INICIO:  ${tiempoInicio.toFixed(4)} segundos`);

  // Calcular cuántas veces más lento
  const vecesMasLento = tiempoInicio / tiempoFinal;
  console.log(`\n⚠️  Insertar al INICIO es ${vecesMasLento.toFixed(1)}x MÁS LENTO`);

  console.log("\n" + "=".repeat(70));
  console.log("💡 ¿POR QUÉ?");
  console.log("=".repeat(70));
  console.log(`
✓ INSERTAR AL FINAL (push):
  - Solo agrega al final del arreglo
  - No mueve ningún elemento
  - Muy rápido: O(1) en tiempo promedio

❌ INSERTAR AL INICIO (unshift):
  - Necesita mover TODOS los elementos una posición a la derecha
  - Cuanto más crece el arreglo, más lento se vuelve
  - Muy lento: O(n) donde n es el tamaño del arreglo
  
Cuando insertas 100,000 veces al inicio, mueves millones de elementos.
Por eso es tan lentísimo comparado con insertar al final.
`);
}

if (require.main === module) {
  mostrarComparativa();
}