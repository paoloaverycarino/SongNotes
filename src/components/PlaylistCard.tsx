// src/components/PlaylistCard.tsx
import { useEffect, useState } from "react";
import axios from "axios";

function PlaylistCard({ playlistId }: { playlistId: string }) {
  const [playlist, setPlaylist] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      setError("No access token found. Please log in with Spotify.");
      return;
    }

    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlaylist(res.data))
      .catch(() => setError("Failed to fetch playlist."));
  }, [playlistId]);

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4">{playlist.name}</h2>
      <img
        src={playlist.images[0]?.url}
        alt={playlist.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <ul className="space-y-2">
        {playlist.tracks.items.slice(0, 5).map((item: any) => (
          <li key={item.track.id} className="text-white truncate">
            {item.track.name} — {item.track.artists.map((a: any) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistCard;