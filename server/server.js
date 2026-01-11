const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const querystring = require('querystring');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let spotifyToken = null;
let tokenExpiration = 0;

// Helper: Get Spotify Access Token
const getSpotifyToken = async () => {
  if (spotifyToken && Date.now() < tokenExpiration) return spotifyToken;

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({ grant_type: 'client_credentials' })
  };

  try {
    const response = await axios(authOptions);
    spotifyToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    return spotifyToken;
  } catch (error) {
    console.error("Error fetching token", error);
    return null;
  }
};

// Route: Search Songs
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Query required" });

  const token = await getSpotifyToken();
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    res.json(response.data.tracks.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to search spotify" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});