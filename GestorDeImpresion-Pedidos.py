#!/usr/bin/env python3
"""
Archivo: GestorDeImpresion-Pedidos.py
Implementa una Cola simple para procesar peticiones de una "API" en orden de llegada.
Código muy fácil de entender con comentarios en español.
"""

from collections import deque
from datetime import datetime


class GestorDeImpresion:
    """Gestiona una cola de peticiones de impresión.

    Usa una cola (FIFO: primero que entra, primero que sale) para procesar
    peticiones en el orden exacto en que llegan.
    """

    def __init__(self):
        # deque es una "cola doble" de Python, perfecta para FIFO
        self.cola = deque()
        # Contador para dar ID único a cada petición
        self.contador_peticiones = 0

    def recibir_peticion(self, documento, copias=1):
        """Recibir una nueva petición de impresión (simula API).

        Parámetros:
            documento (str): Nombre del documento a imprimir
            copias (int): Cuántas copias imprimir (default 1)

        La petición se agrega al final de la cola.
        """
        self.contador_peticiones += 1
        peticion = {
            "id": self.contador_peticiones,
            "documento": documento,
            "copias": copias,
            "hora": datetime.now().strftime("%H:%M:%S")
        }
        self.cola.append(peticion)
        print(f"✓ Petición #{peticion['id']} recibida: {documento} ({copias} copias)")

    def procesar_peticion(self):
        """Procesar la siguiente petición de la cola.

        Toma la petición del inicio de la cola (FIFO).
        Devuelve None si la cola está vacía.
        """
        if not self.cola:
            print("⚠ No hay peticiones en la cola")
            return None

        peticion = self.cola.popleft()  # popleft() = sacar del inicio de la cola
        print(f"\n▶ Procesando petición #{peticion['id']}")
        print(f"  Documento: {peticion['documento']}")
        print(f"  Copias: {peticion['copias']}")
        print(f"  Hora de llegada: {peticion['hora']}")
        print(f"  ✓ Impresión completada")
        return peticion

    def ver_cola(self):
        """Mostrar todas las peticiones que están esperando en la cola."""
        if not self.cola:
            print("\nLa cola está vacía")
            return

        print(f"\n📋 Cola ({len(self.cola)} peticiones en espera):")
        for i, peticion in enumerate(self.cola, start=1):
            print(f"  {i}. #{peticion['id']} - {peticion['documento']} ({peticion['copias']} copias)")

    def cantidad_en_cola(self):
        """Retorna cuántas peticiones hay esperando."""
        return len(self.cola)


def menu_interactivo():
    """Menú interactivo donde el usuario puede probar la cola en tiempo real.

    El usuario puede:
    - Agregar peticiones
    - Ver la cola
    - Procesar peticiones
    - Salir del programa
    """
    gestor = GestorDeImpresion()

    print("\n" + "=" * 60)
    print("🖨️  GESTOR DE IMPRESIÓN CON COLA")
    print("=" * 60)
    print("Bienvenido. Prueba cómo funciona la cola FIFO.\n")

    while True:
        # Mostrar menú
        print("\n" + "-" * 60)
        print("MENÚ:")
        print("  1. Agregar una petición de impresión")
        print("  2. Ver cola de espera")
        print("  3. Procesar siguiente petición")
        print("  4. Salir")
        print("-" * 60)

        opcion = input("Elige una opción (1-4): ").strip()

        if opcion == "1":
            # Agregar petición
            print("\n--- Agregar Petición ---")
            documento = input("Nombre del documento: ").strip()
            if not documento:
                documento = "Documento sin nombre"

            try:
                copias = int(input("Número de copias (default 1): ").strip() or "1")
                if copias < 1:
                    copias = 1
            except ValueError:
                copias = 1

            gestor.recibir_peticion(documento, copias)

        elif opcion == "2":
            # Ver cola
            print()
            gestor.ver_cola()

        elif opcion == "3":
            # Procesar petición
            print()
            gestor.procesar_peticion()

        elif opcion == "4":
            # Salir
            print("\n👋 ¡Hasta luego!")
            break

        else:
            print("❌ Opción no válida. Intenta de nuevo.")


if __name__ == "__main__":
    menu_interactivo()
