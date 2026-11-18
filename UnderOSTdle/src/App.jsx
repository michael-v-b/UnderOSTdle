import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SongManager from "./SongManager.jsx";
import GuessBox from "./GuessBox.jsx";
import SongBox from "./SongBox.jsx";
import "./App.css";

function App() {
  const [startSong, setStartSong] = useState("");
  const [endSong, setEndSong] = useState("");
  const [songPath, setSongPath] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [songGuess, setSongGuess] = useState("");
  const [wonGame, setWonGame] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [guessedSongs, setGuessedSongs] = useState([]);
  const [graphBuilt, setBuilt] = useState(false);
  const [notSong, setNotSong] = useState(false);
  const [notNeighbor, setNotNeighbor] = useState(false);
  const [solutionVisible, setSolutionVisible] = useState(false);

  const SongManagerRef = useRef(null);

  // build graph
  useEffect(() => {
    SongManagerRef.current.initializeSongs();
    setBuilt(true);
  }, []);
  //update songs when difficulty is changed
  useEffect(() => {
    if (graphBuilt) {
      newGame();
    }
  }, [difficulty, graphBuilt]);

  useEffect(() => {
    console.log("currentSong: " + currentSong.name);
    if (currentSong && currentSong != startSong) {
      setGuessedSongs((prevGuessedSongs) => [
        ...guessedSongs,
        <>
          <SongBox song={currentSong} />
          <div className="arrow">{"->"}</div>
        </>,
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

    console.log("finalResult: " + finalResult);
    if (finalResult) {
      setWonGame(true);
    }
  };

  function newGame() {
    var songs;
    songs = SongManagerRef.current.getSongs(difficulty);
    setStartSong(songs[0]);
    setCurrentSong(songs[0]);
    setEndSong(songs[1]);
    setSongPath(songs[2]);
    setGuessedSongs([]);
    setWonGame(false);
    setSolutionVisible(false);
    setSongGuess("");
  }

  function showSolution() {
    const solution = SongManagerRef.current.getSolution(
      songPath,
      startSong.name,
      endSong.name,
    );
    setSolutionVisible(true);
    console.log(solution);
  }

  return (
    <>
      <div className="page-container">
        <SongManager ref={SongManagerRef} />
        <div>
          <h1>deltatune</h1>
          <p className="instruction">
            Connect the 2 Undertale/Deltarune songs using their shared motifs!
          </p>
        </div>

        <div className="instruction-header">Songs to Connect:</div>

        <div className="show-solution-container">
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
            whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
            className="button-border show-solution"
            onMouseUp={showSolution}
          >
            {" "}
            Show Solution?{" "}
          </motion.div>
        </div>
        <hr />
        {wonGame && (
          <>
            <div className="win-text">YOU WIN!!!</div>
          </>
        )}

        {(wonGame || solutionVisible) && (
          <motion.div
            className="play-again"
            whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
            whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
            onMouseUp={newGame}
          >
            Play Again?
          </motion.div>
        )}
        <div className="song-container">
          <SongBox song={startSong} />
          <div className="arrow">{"->"}</div>
          {guessedSongs}
          {!wonGame && (
            <>
              <GuessBox />
              <div className="arrow">{"->"}</div>
            </>
          )}
          <SongBox song={endSong} />
        </div>
        <div className="song-guess-container">
          <input
            className="song-input"
            placeholder="Enter a song"
            value={songGuess}
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
            * {songGuess} does not share any motifs with {currentSong.name}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
