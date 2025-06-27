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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-white drop-shadow-lg text-center">
          Your Top 5 Spotify Tracks
        </h1>
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl p-8 w-full max-w-xl">
          <ul className="space-y-6">
            {tracks.map((track, idx) => (
              <li
                key={track.id}
                className={`flex items-center gap-4 p-4 rounded-xl hover:bg-white/20 transition-colors cursor-pointer`}
                onClick={() => window.open(track.external_urls.spotify, "_blank")}
              >
                <span className="text-2xl font-bold text-green-400 w-8 text-right">{idx + 1}.</span>
                <img
                  src={track.album.images[2]?.url || track.album.images[0]?.url}
                  alt={track.name}
                  className="w-14 h-14 rounded-lg object-cover shadow"
                />
                <div className="flex-1">
                  <div className="text-lg md:text-2xl font-semibold text-white truncate">{track.name}</div>
                  <div className="text-sm text-gray-200">{track.artists.map((a: any) => a.name).join(", ")}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopTracks; 