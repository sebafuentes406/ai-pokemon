# AI Pokémon

Este proyecto es una Pokédex interactiva desarrollada en colaboración con **gonzaloavilacartes**. Su objetivo es recopilar datos de la [PokeAPI](https://pokeapi.co/) y permitir a los usuarios explorar información de Pokémon, así como interactuar con asistentes potenciados por inteligencia artificial.

## Características

- **Pokédex completa:** Consulta y busca Pokémon usando datos obtenidos dinámicamente desde la PokeAPI.
- **Chat con IA:** Conversa con cualquier Pokémon gracias a la integración con modelos de lenguaje (Gemini).
- **Sistema de favoritos:** Marca tus Pokémon preferidos y guarda tus elecciones localmente.
- **Interfaz moderna:** Construida con React, React Router y Bootstrap para una experiencia fluida y responsiva.

## ¿Cómo funciona?

- **Recopilación de datos:** La aplicación obtiene la lista y detalles de los Pokémon directamente desde la PokeAPI, asegurando información actualizada y precisa.
- **Asistente con IA:** Al seleccionar un Pokémon, puedes iniciar un chat donde la IA responde como si fuera ese Pokémon, utilizando modelos avanzados de lenguaje natural.

## Tecnologías utilizadas

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Vite](https://vitejs.dev/)
- [PokeAPI](https://pokeapi.co/)
- [Google Gemini API](https://aistudio.google.com/app/apikey)

## Instalación y uso

1. **Clona el repositorio:**
   ```sh
   git clone <URL_DEL_REPO>
   cd ai-pokemon
2. **Instalar dependencias:**
   ''sh
   npm install
3. Configura tu clave de API de Gemini:
  - Obtén una clave en Google AI Studio.
  - Coloca tu clave en el archivo correspondiente donde se realiza la llamada a la API.
4. Inicia la aplicación:
  ''sh
  npm run dev
