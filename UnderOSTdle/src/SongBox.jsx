import ReactPlayer from "react-player";
const SongBox = ({ song }) => {
  return (
    <>
      <div className="song-box">
        <div className="song-box-text">{song.name}</div>
        <ReactPlayer
          className="song-box-video"
          height="10vh"
          width="10vh"
          src={song.url}
          controls={true}
        />
      </div>
    </>
  );
};
export default SongBox;
