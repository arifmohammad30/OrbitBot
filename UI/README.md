# OrbitBot UI

## Project Overview
OrbitBot is a modern AI chat assistant built with React, Vite, TypeScript, and Tailwind CSS. This UI folder contains the entire frontend for the chat app.

---

## Folder Structure
```
UI/
  public/           # Static files (favicon, etc.)
  src/
    assets/         # Images and icons (bot-avatar.jpg, user-avatar.png, ...)
    components/     # Reusable UI components
    pages/          # Main page(s) of the app
    hooks/          # Custom React hooks
    index.css       # Global styles
    main.tsx        # App entry point
    ...
  package.json      # Project dependencies and scripts
  vite.config.ts    # Vite configuration
  index.html        # HTML template
```

---

## How to Run the App (Frontend Only)
1. Open a terminal and navigate to the `UI` folder:
   ```sh
   cd UI
   npm install      # Install dependencies
   npm run dev      # Start the development server
   ```
2. Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## How to Connect a Backend
1. **Set up your backend** (Node.js, Python, etc.) in a separate folder (e.g., `backend/`).
2. **Start your backend server** (e.g., on port 5000).
3. **Call your backend API** from the frontend using `fetch` or `axios`:
   ```js
   fetch('http://localhost:5000/api/message', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message: userMessage })
   })
     .then(res => res.json())
     .then(data => {
       // handle bot response
     });
   ```
4. **CORS:** Make sure your backend allows CORS for your frontend's origin during development.

---

## How to Run Both Frontend and Backend
- Open two terminals:
  1. In `UI/`:  `npm run dev`
  2. In `backend/`:  `npm start` (or your backend start command)

---

## Deployment
- Deploy the frontend (UI) to Vercel, Netlify, or any static host.
- Deploy the backend to Render, Heroku, Railway, or your own server.
- Update frontend API URLs to point to your deployed backend.

---

**Need help connecting a specific backend? Just ask!** 