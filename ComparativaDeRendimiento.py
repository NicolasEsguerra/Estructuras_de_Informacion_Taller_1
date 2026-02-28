#!/usr/bin/env python3
"""
Archivo: ComparativaDeRendimiento.py
Compara el tiempo de insertar 100,000 elementos al inicio de un Array
vs. insertar al final. Código muy simple con comentarios en español.
"""

import time


def insertar_al_inicio():
    """Insertar 100,000 números al INICIO de una lista.

    Usa insert(0, elemento) para poner cada elemento al principio.
    Esto es LENTO porque todos los elementos previos deben moverse.
    """
    lista = []

    # Medir el tiempo inicial
    tiempo_inicio = time.time()

    # Insertar 100,000 números al inicio
    for i in range(100000):
        lista.insert(0, i)  # Insertar siempre en posición 0 (al inicio)

    # Medir el tiempo final
    tiempo_fin = time.time()

    # Calcular cuánto tiempo tomó
    tiempo_total = tiempo_fin - tiempo_inicio

    return tiempo_total


def insertar_al_final():
    """Insertar 100,000 números al FINAL de una lista.

    Usa append(elemento) para agregar cada elemento al final.
    Esto es RÁPIDO porque no hay que mover nada.
    """
    lista = []

    # Medir el tiempo inicial
    tiempo_inicio = time.time()

    # Insertar 100,000 números al final
    for i in range(100000):
        lista.append(i)  # Agregar siempre al final

    # Medir el tiempo final
    tiempo_fin = time.time()

    # Calcular cuánto tiempo tomó
    tiempo_total = tiempo_fin - tiempo_inicio

    return tiempo_total


def mostrar_comparativa():
    """Ejecutar ambas pruebas y mostrar la comparación.

    Esto demostrará cuánto más lento es insertar al inicio
    que insertar al final.
    """
    print("\n" + "=" * 70)
    print("⏱️  COMPARATIVA DE RENDIMIENTO: INSERTAR AL INICIO vs AL FINAL")
    print("=" * 70)

    # Prueba 1: Insertar al final (RÁPIDO)
    print("\n📊 PRUEBA 1: Insertar 100,000 elementos al FINAL")
    print("-" * 70)
    print("Usando: lista.append(elemento)")
    print("Esto es rápido porque no hay que mover elementos...")
    tiempo_final = insertar_al_final()
    print(f"✓ Tiempo: {tiempo_final:.4f} segundos")

    # Prueba 2: Insertar al inicio (LENTO)
    print("\n📊 PRUEBA 2: Insertar 100,000 elementos al INICIO")
    print("-" * 70)
    print("Usando: lista.insert(0, elemento)")
    print("Esto es lento porque CADA elemento debe moverse de posición...")
    tiempo_inicio = insertar_al_inicio()
    print(f"✓ Tiempo: {tiempo_inicio:.4f} segundos")

    # Mostrar la comparación
    print("\n" + "=" * 70)
    print("📈 COMPARACIÓN Y ANÁLISIS")
    print("=" * 70)
    print(f"Tiempo insertar al FINAL:   {tiempo_final:.4f} segundos")
    print(f"Tiempo insertar al INICIO:  {tiempo_inicio:.4f} segundos")

    # Calcular cuántas veces más lento
    veces_mas_lento = tiempo_inicio / tiempo_final
    print(f"\n⚠️  Insertar al INICIO es {veces_mas_lento:.1f}x MÁS LENTO")

    print("\n" + "=" * 70)
    print("💡 ¿POR QUÉ?")
    print("=" * 70)
    print("""
✓ INSERTAR AL FINAL (append):
  - Solo agrega al final de la lista
  - No mueve ningún elemento
  - Muy rápido: O(1) en tiempo promedio

❌ INSERTAR AL INICIO (insert(0, ...)):
  - Necesita mover TODOS los elementos una posición a la derecha
  - Cuanto más crece la lista, más lento se vuelve
  - Muy lento: O(n) donde n es el tamaño de la lista
  
Cuando insertas 100,000 veces al inicio, mueves millones de elementos.
Por eso es tan lentísimo comparado con insertar al final.
""")


if __name__ == "__main__":
    mostrar_comparativa()
