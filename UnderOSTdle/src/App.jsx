import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SongManager from "./SongManager.jsx";
import GuessBox from "./GuessBox.jsx";
import SongBox from "./SongBox.jsx";
import "./App.css";

function App() {
  const [startSong, setStartSong] = useState("");
  const [endSong, setEndSong] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const [songGuess, setSongGuess] = useState("");
  const [wonGame, setWonGame] = useState(false);
  const [difficulty, setDifficulty] = useState(2);
  const [guessedSongs, setGuessedSongs] = useState([]);
  const [graphBuilt, setBuilt] = useState(false);
  const [notSong, setNotSong] = useState(false);
  const [notNeighbor, setNotNeighbor] = useState(false);
  const SongManagerRef = useRef(null);

  // build graph
  useEffect(() => {
    SongManagerRef.current.initializeSongs();
    setBuilt(true);
  }, []);
  //update songs when difficulty is changed
  useEffect(() => {
    var songs = [];
    if (graphBuilt) {
      songs = SongManagerRef.current.getSongs(difficulty);
      setStartSong(songs[0]);
      setCurrentSong(songs[0]);
      setEndSong(songs[1]);
    }
  }, [difficulty, graphBuilt]);

  useEffect(() => {
    if (currentSong && currentSong != startSong) {
      setGuessedSongs((prevGuessedSongs) => [
        ...guessedSongs,
        <SongBox song={currentSong} />,
      ]);
    }
  }, [currentSong]);

  const handleSubmit = () => {
    //if the guess is not a real song
    if (!SongManagerRef.current.getSong(songGuess)) {
      setNotSong(true);
      return false;
    }
    //check if neighbors with current song
    const nextResult = SongManagerRef.current.checkNeighbor(
      currentSong.name,
      songGuess,
    );
    //if not neighbors with first song do not continue
    if (!nextResult) {
      setNotNeighbor(true);
      return false;
    }
    setNotSong(false);
    setNotNeighbor(false);
    var guessedSong = SongManagerRef.current.getSong(songGuess);
    setCurrentSong(guessedSong);

    //check if song wins
    const finalResult = SongManagerRef.current.checkNeighbor(
      songGuess,
      endSong.name,
    );
    if (finalResult) {
      setWonGame(true);
    }
  };

  return (
    <>
      <div className="page-container">
        <SongManager ref={SongManagerRef} />
        <div>
          <h1>UnderOSTdle</h1>
          <p className="instruction">
            Connect the 2 Undertale/Deltarune songs using their shared motifs!
          </p>
        </div>
        {wonGame && <div className="win-text">YOU WIN!!!</div>}
        <div className="instruction-header">Songs to Connect:</div>
        <div className="song-container">
          <SongBox song={startSong} />
          {guessedSongs}
          {!wonGame && <GuessBox />}
          <SongBox song={endSong} />
        </div>
        <div className="song-guess-container">
          <input
            className="song-input"
            placeholder="Enter a song"
            onChange={(event) => {
              setSongGuess(event.target.value);
              setNotNeighbor(false);
              setNotSong(false);
            }}
          ></input>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, backgroundColor: "#6b6b6b" }}
            onMouseUp={handleSubmit}
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
            * {songGuess} does not share any motifs with {startSong.name}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
