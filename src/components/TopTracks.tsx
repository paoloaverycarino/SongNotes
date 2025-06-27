import { useEffect, useState } from "react";
import axios from "axios";

function TopTracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      setError("No access token found. Please log in with Spotify.");
      return;
    }

    axios
      .get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTracks(res.data.items))
      .catch(() => setError("Failed to fetch top tracks. Please re-login."));
  }, []);

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  }

  if (!tracks.length) {
    return <div className="flex items-center justify-center min-h-screen">Loading top tracks...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Top 5 Spotify Tracks</h1>
      <ul>
        {tracks.map((track) => (
          <li key={track.id} className="mb-2">
            {track.name} — {track.artists.map((a: any) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopTracks; 