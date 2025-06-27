import { generateCodeVerifier, generateCodeChallenge } from "@/lib/pkce";

const CLIENT_ID = "5efe9078d47248d9b2c27ff4d2a414d5";
const REDIRECT_URI = "http://127.0.0.1:5173/callback";
const SCOPES = "user-top-read";

function SpotifyLoginButton() {
  const handleLogin = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("spotify_code_verifier", verifier);

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      SCOPES
    )}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&code_challenge_method=S256&code_challenge=${challenge}`;

    window.location.href = authUrl;
  };

  return <button onClick={handleLogin} className="text-white">Login with Spotify</button>;
}

export default SpotifyLoginButton;