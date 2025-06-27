import SpotifyLoginButton from "@/component/SpotifyLoginButton";

function Home() {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(120deg, #1DB954 0%, #191414 100%)"
      }}
    >
        <div className="flex flex-col items-center justify-center w-screen h-screen">

        <h1 className="text-white font-bold text-8xl text-center">
            SongNotes
        </h1>
        <br />
        <SpotifyLoginButton />
        </div>
    </div>
  );
}

export default Home;