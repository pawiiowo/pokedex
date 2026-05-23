**Nombre:** Paulina Mendoza Quiroz  
**Clase:** Aplicaciones Web  

# Proyecto PokeAPI - Pokedex Interactiva

Este proyecto consiste en el desarrollo de una aplicacion web funcional de una Pokedex interactiva que consume datos en tiempo real desde la PokeAPI publica. La interfaz implementa un tipado fuerte, navegacion dinamica por rutas, componentes reutilizables y persistencia de datos local en el navegador.

## Requerimientos y Funcionalidades Cumplidas

### Arquitectura y Configuracion (RT01 - RT08)
* **RT01 - RT04**: Configuracion inicial del entorno utilizando Vite con React, Yarn como gestor de paquetes y establecimiento de politicas de seguridad mediante un archivo `.npmrc`.
* **RT08**: Organizacion modular y profesional del proyecto mediante una estructura limpia de carpetas separadas para componentes (`components`), pantallas (`pages` o `screens`), servicios de red (`services`) y tipados (`types`).
* **Git (RT06)**: Control de versiones riguroso con un historial de commits descriptivo y ordenado que refleja la evolucion incremental del desarrollo.

### Interfaz y Componentes Reutilizables (RF01 - RF02)
* **RT03 / RF01**: Diseño y creacion del componente modular `PokemonCard` para renderizar de forma dinamica y limpia las tarjetas de los Pokemon en la cuadricula principal sin duplicar codigo.
* **RF01 (Optimizacion)**: Implementacion de un motor de peticiones asincronas concurrentes con `Promise.all` para consultar y procesar los datos de los 151 Pokemon originales de la primera generacion en paralelo, eliminando el uso de diccionarios manuales estaticos.
* **RF02**: Creacion de una vista de detalle dinamica vinculada mediante rutas (`/pokemon/:name`) que extrae la informacion especifica del objeto seleccionado (imagen oficial, tipos, peso, altura, habilidades y sus estadisticas base).

### Busqueda, Filtros y Persistencia (RF03 - RF05)
* **RF03**: Barra de busqueda integrada en la pantalla principal que filtra de manera reactiva y en tiempo real a los Pokemon segun el texto ingresado por el usuario.
* **RF04**: Menu desplegable de seleccion que permite filtrar el listado de manera automatica evaluando los tipos elementales devueltos por la API.
* **RF05**: Sistema de guardado y gestion de favoritos por medio de un boton de corazon integrado en cada tarjeta. La lista se almacena localmente mediante la API de `localStorage` (`pokefavoritos`) para evitar que los datos se borren al refrescar la pagina.

### Modulo de Comparacion y Control de Estados (RF06 - RF07)
* **RF06**: Diseño e incorporacion de la pantalla del Comparador de Pokemon (`/compare`). Cuenta con menus desplegables de seleccion doble para contrastar las estadisticas base (HP, Ataque, Defensa y Velocidad) en una tabla dinamica, resaltando con estilos condicionales en color verde al atributo ganador de la batalla.
* **RF07**: Manejo e implementacion de estados de carga globales para controlar visualmente los tiempos de espera de la red ("Cargando los 151 Pokemon originales..."), ademas de mensajes condicionales cuando los criterios de busqueda no arrojan resultados.

## Tecnologias Usadas
* React 18
* TypeScript (Tipado estricto para interfaces y respuestas de la API)
* Vite
* React Router DOM (Manejo de rutas dinamicas y exactas)
* Fetch API (Peticiones concurrentes con Promise.all)
* LocalStorage API (Persistencia en el navegador)
* CSS Dinamico (Estilos en linea y condicionales)

## Instalacion y Ejecucion

1. Clonar este repositorio en tu equipo local o extraer el archivo ZIP del proyecto.
2. Abrir una terminal en la carpeta raiz del proyecto.
3. Instalar la totalidad de las dependencias necesarias ejecutando el comando:
   ```bash
   yarn install