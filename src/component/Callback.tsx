import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "5efe9078d47248d9b2c27ff4d2a414d5";
const REDIRECT_URI = "http://127.0.0.1:5173/callback";

function Callback() {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const verifier = localStorage.getItem("spotify_code_verifier");

    if (code && verifier) {
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: verifier,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          localStorage.setItem("spotify_access_token", res.data.access_token);
          navigate("/profile");
        });
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
}

export default Callback;
