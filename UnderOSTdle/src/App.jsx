import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SongManager from "./SongManager.jsx";
import GuessBox from "./GuessBox.jsx";
import SongBox from "./SongBox.jsx";
import MotifList from "./MotifList.jsx";
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
  const [showMotifs, setShowMotifs] = useState(false);

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
          <div className="motif-container">
            <SongBox song={currentSong} />
            {currentSong && showMotifs && (
              <MotifList motifs={currentSong.motifs} />
            )}
          </div>
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
    setShowMotifs(false);
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
  function toggleMotifs() {
    setShowMotifs(!showMotifs);
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
        <div className="game-options-container">
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
            whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
            className="button-border game-options"
            onMouseUp={toggleMotifs}
          >
            {" "}
            Show Motifs?{" "}
          </motion.div>
          <div className="difficulty-container">
            <div className="game-option">Difficulty:</div>
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
              whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
              className="button-border game-options"
              onMouseUp={() => {
                setDifficulty(2);
                newGame();
              }}
            >
              {" "}
              Easy{" "}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
              whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
              className="button-border game-options"
              onMouseUp={() => {
                setDifficulty(3);
                newGame();
              }}
            >
              {" "}
              Medium{" "}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
              whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
              className="button-border game-options"
              onMouseUp={() => {
                setDifficulty(4);
                newGame();
              }}
            >
              {" "}
              Hard{" "}
            </motion.div>
          </div>
        </div>
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
          <dev className="motif-container">
            <SongBox song={startSong} />
            {startSong && showMotifs && <MotifList motifs={startSong.motifs} />}
          </dev>
          <div className="arrow">{"->"}</div>
          {guessedSongs}
          {!wonGame && (
            <>
              <GuessBox />
              <div className="arrow">{"->"}</div>
            </>
          )}
          <dev className="motif-container">
            <SongBox song={endSong} />
            {endSong && showMotifs && <MotifList motifs={endSong.motifs} />}
          </dev>
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
