import ReactPlayer from "react-player";
import MotifList from "./MotifList.jsx";
const SongBox = ({ song, showMotifs }) => {
  return (
    <>
      <div className="song-box">
        <div className="song-box-text">{song.name}</div>
        <ReactPlayer
          className="song-box-video"
          src={song.url}
          controls={true}
        />
      </div>
      {showMotifs && <MotifList motifs={song.motifs} />}
    </>
  );
};
export default SongBox;
