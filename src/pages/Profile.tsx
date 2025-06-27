import TopTracks from "@/components/TopTracks";
import PlaylistCard from "@/components/PlaylistCard";

function Profile() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full h-full p-4">
        {/* Top Tracks Card */}
        <div className="flex-1 flex items-center justify-center">
          <TopTracks />
        </div>
        {/* Playlist Card */}
        <div className="flex-1 flex items-center justify-center">
          <PlaylistCard playlistId="4tACbEVJqbVEsdSOqugC26?si=18320b6034ee4159" />
          {/* Replace with your desired playlist ID */}
        </div>
      </div>
    </div>
  );
}

export default Profile; 