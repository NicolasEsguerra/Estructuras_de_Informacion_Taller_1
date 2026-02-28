#!/usr/bin/env python3
"""
Archivo: ElHistorialDeNavegacion.py
Implementa una clase `Navegador` muy simple que usa pilas para gestionar
las funciones "Ir atrás" e "Ir adelante". Código con comentarios en español
para que cualquiera lo entienda.
"""

class Navegador:
    """Simula el historial del navegador de forma muy simple.

    Usa una lista para guardar el historial completo de páginas visitadas
    y un índice (posición) para saber dónde estamos.

    Por ejemplo:
      historial = ["google.com", "youtube.com", "github.com"]
      posicion = 2  (estamos en "github.com", el último)
    """

    def __init__(self):
        # Lista que guardará todas las páginas visitadas
        self.historial = []
        # Índice que indica dónde estamos (cuál página estamos viendo)
        self.posicion = -1

    def visitar(self, url):
        """Visitar una nueva URL.

        - Agrega la URL al final del historial.
        - Movemos la posición al final (a esa URL).
        - Si habíamos ido atrás, eliminamos todo lo que venía después
          (porque se crea un nuevo "futuro" al visitar algo nuevo).
        """
        # Si no estamos al final del historial, borramos lo que venía después
        if self.posicion < len(self.historial) - 1:
            self.historial = self.historial[:self.posicion + 1]

        # Agregamos la nueva URL
        self.historial.append(url)
        self.posicion += 1

    def ir_atras(self):
        """Ir a la página anterior (disminuir la posición).

        Devuelve la página a la que fuimos, o None si no hay antes.
        """
        if self.posicion <= 0:
            return None
        self.posicion -= 1
        return self.historial[self.posicion]

    def ir_adelante(self):
        """Ir a la página siguiente (aumentar la posición).

        Devuelve la página a la que fuimos, o None si no hay después.
        """
        if self.posicion >= len(self.historial) - 1:
            return None
        self.posicion += 1
        return self.historial[self.posicion]

    def obtener_actual(self):
        """Retorna la URL actual (o None si no hay ninguna)."""
        if self.posicion >= 0 and self.posicion < len(self.historial):
            return self.historial[self.posicion]
        return None


def menu_interactivo():
    """Menú interactivo donde el usuario puede probar el navegador.

    El usuario puede:
    - Visitar URLs
    - Ir atrás
    - Ir adelante
    - Ver el estado de la navegación
    - Salir del programa
    """
    nav = Navegador()

    print("\n" + "=" * 60)
    print("🌐 NAVEGADOR INTERACTIVO")
    print("=" * 60)
    print("Prueba cómo funciona el historial con Pilas.\n")

    while True:
        # Mostrar estado actual
        if nav.obtener_actual():
            print(f"\n📍 Página actual: {nav.obtener_actual()}")
            print(f"   Historial: {nav.historial}")
            print(f"   Posición: {nav.posicion}")
        else:
            print("\n📍 No has visitado ninguna página aún")

        # Mostrar menú
        print("\n" + "-" * 60)
        print("MENÚ:")
        print("  1. Visitar una URL")
        print("  2. Ir atrás")
        print("  3. Ir adelante")
        print("  4. Ver historial completo")
        print("  5. Salir")
        print("-" * 60)

        opcion = input("Elige una opción (1-5): ").strip()

        if opcion == "1":
            # Visitar URL
            print("\n--- Visitar URL ---")
            url = input("Escribe la URL a visitar: ").strip()
            if url:
                nav.visitar(url)
                print(f"✓ Visitaste: {url}")
            else:
                print("❌ URL vacía. Intenta de nuevo.")

        elif opcion == "2":
            # Ir atrás
            print("\n--- Ir Atrás ---")
            resultado = nav.ir_atras()
            if resultado:
                print(f"✓ Fuiste atrás a: {resultado}")
            else:
                print("❌ No puedes ir más atrás (estás al principio)")

        elif opcion == "3":
            # Ir adelante
            print("\n--- Ir Adelante ---")
            resultado = nav.ir_adelante()
            if resultado:
                print(f"✓ Avanzaste a: {resultado}")
            else:
                print("❌ No puedes ir más adelante")

        elif opcion == "4":
            # Ver historial completo
            print("\n--- Historial Completo ---")
            if nav.historial:
                print(f"Total de páginas visitadas: {len(nav.historial)}")
                for i, pagina in enumerate(nav.historial):
                    marca = " <-- TÚ ESTÁS AQUÍ" if i == nav.posicion else ""
                    print(f"  {i + 1}. {pagina}{marca}")
            else:
                print("El historial está vacío")

        elif opcion == "5":
            # Salir
            print("\n👋 ¡Hasta luego!")
            break

        else:
            print("❌ Opción no válida. Intenta de nuevo.")


if __name__ == "__main__":
    menu_interactivo()
