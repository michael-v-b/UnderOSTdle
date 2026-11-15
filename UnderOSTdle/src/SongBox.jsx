import ReactPlayer from "react-player";
const SongBox = ({ song }) => {
  return (
    <>
      <div className="song-box">
        <div className="song-box-text">{song.name}</div>
        <ReactPlayer
          className="song-box-video"
          src={song.url}
          height="70%"
          width="100%"
          controls={true}
        />
      </div>
    </>
  );
};
export default SongBox;
