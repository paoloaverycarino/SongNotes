import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import Home from "@/pages/Home";
import Callback from "@/component/Callback";
import { useEffect, useState } from "react";
import axios from "axios";
import TopTracks from "@/components/TopTracks";
import Profile from "@/pages/Profile";

function Playlist() {
  const [playlist, setPlaylist] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      setError("No access token found. Please log in with Spotify.");
      return;
    }

    // Replace with your desired playlist ID
    const playlistId = "37i9dQZF1DXcBWIGoYBM5M"; // Example: Today's Top Hits

    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlaylist(res.data))
      .catch((err) => setError("Failed to fetch playlist. Make sure you are logged in and the token is valid."));
  }, []);

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  }

  if (!playlist) {
    return <div className="flex items-center justify-center min-h-screen">Loading playlist...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-4">{playlist.name}</h1>
        <ul>
          {playlist.tracks.items.map((item: any) => (
            <li key={item.track.id}>
              {item.track.name} - {item.track.artists.map((a: any) => a.name).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="w-full max-w-lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/top-tracks" element={<TopTracks />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
