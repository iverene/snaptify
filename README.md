# Snaptify 🎵📸

**Capture the vibe. Add the track.**

Snaptify is a web-based photobooth application that merges visual memories with audio identity. Users can capture photos via their webcam, apply aesthetic filters (Lo-Fi, B&W), and embed their favorite song using the Spotify Web API. The final output generates a downloadable image containing the photo and an official, scannable **Spotify Code**.

---

## 🚀 Features

* **MVC Architecture:** Clean separation of concerns with a dedicated Backend (Controller/Model) and Frontend (View).
* **Webcam Integration:** Real-time camera feed with high-quality capture.
* **Visual Filters:** Apply real-time CSS filters (Black & White, Low-Quality/Lo-Fi, Default).
* **Spotify Integration:** Live search powered by the Spotify Web API (Client Credentials Flow).
* **Scannable Codes:** Automatically generates a Spotify URI Code that can be scanned by the Spotify App to play the song instantly.
* **Customization:** Choose between Black or White photo frames.
* **Export:** Download the final composition as a high-quality PNG.

---

## 🛠️ Tech Stack

### **Frontend (View)**

* **React (Vite):** Fast, modern UI framework.
* **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
* **React Router:** For multi-page navigation (Home → Capture → Preview → Output).
* **React Webcam:** Handling media stream inputs.
* **HTML-to-Image:** Rendering the DOM node (photo + frame + code) into a downloadable image.
* **Axios:** HTTP requests.

### **Backend (Controller & Model)**

* **Node.js & Express:** Server-side logic.
* **Spotify Web API:** Handling authentication (OAuth Client Credentials) and search queries.
* **Dotenv:** Environment variable management.

---

## 📂 Project Structure

```text
snaptify/
├── client/           # Frontend (React Application)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/    # (Home, Capture, Preview, Output)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/           # Backend (Node/Express API)
│   ├── server.js     # Main Controller & Route Handler
│   ├── .env          # API Keys (Not committed)
│   └── package.json
│
└── README.md

```

---

## ⚙️ Installation & Setup

### Prerequisites

1. **Node.js** installed on your machine.
2. A **Spotify Developer Account**.
* Create an app at [developer.spotify.com](https://developer.spotify.com/dashboard/).
* Get your `Client ID` and `Client Secret`.



### 1. Backend Setup

Navigate to the server directory and install dependencies.

```bash
cd server
npm install

```

Create a `.env` file in the `server` folder and add your credentials:

```env
PORT=5000
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

```

Start the server:

```bash
node server.js

```

*Server will run on http://localhost:5000*

### 2. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies.

```bash
cd client
npm install

```

Start the React development server:

```bash
npm run dev

```

*Client will run on http://localhost:5173 (or similar)*

---

## 📜 License

This project is for educational purposes. All Spotify related assets (Codes, Metadata) are property of Spotify.
