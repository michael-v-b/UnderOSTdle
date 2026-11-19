import { motion } from "framer-motion";

const SongGuesser = ({
  onSubmit,
  onSongGuess,
  songGuess,
  notSong,
  notNeighbor,
  setNotNeighbor,
  setNotSong,
}) => {
  return (
    <>
      {" "}
      <div className="song-guess-container">
        <input
          className="song-input"
          placeholder="Enter a song"
          value={songGuess}
          onChange={(event) => {
            onSongGuess(event.target.value);
            setNotNeighbor(false);
            setNotSong(false);
          }}
        ></input>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, backgroundColor: "#6b6b6b" }}
          onMouseUp={onSubmit}
          className="submit-button"
        >
          Submit
        </motion.div>
      </div>
      {notSong && (
        <div className="error-message">
          * {songGuess} is not a song in Undertale or Deltarune
        </div>
      )}
      {notNeighbor && (
        <div className="error-message">
          * {songGuess} does not share any motifs with {currentSong.name}
        </div>
      )}
    </>
  );
};
export default SongGuesser;
