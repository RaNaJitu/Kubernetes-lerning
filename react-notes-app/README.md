# My Notes

A responsive React + Vite notes dashboard with create, read, update, delete, live search, and browser LocalStorage persistence.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    Icons.jsx
    Navbar.jsx
    NoteCard.jsx
    NoteForm.jsx
    NotesList.jsx
    SearchBar.jsx
  App.jsx
  App.css
  index.css
  main.jsx
index.html
vite.config.js
package.json
```

Notes are stored in the browser under `my-notes-app:v1`. They stay on the same browser and device until site data is cleared. No account or backend is required.

## Run with Docker

Build the production image and start the app:

```bash
docker compose up --build -d
```

Open **http://localhost:8080**.

View container status and logs:

```bash
docker compose ps
docker compose logs -f notes-app
```

Stop the app:

```bash
docker compose down
```

Build the image without Compose:

```bash
docker build -t my-notes-app:latest .
docker run --name my-notes-app -p 8080:80 -d my-notes-app:latest
```

The Dockerfile uses a multi-stage build: Node.js 22 builds the Vite app, then Nginx serves the optimized static files. Notes are stored in each browser's LocalStorage, not in the container.
