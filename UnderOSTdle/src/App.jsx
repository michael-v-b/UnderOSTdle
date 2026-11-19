import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SongManager from "./SongManager.jsx";
import GuessBox from "./GuessBox.jsx";
import GameOptions from "./GameOptions.jsx";
import SongBox from "./SongBox.jsx";
import SongGuesser from "./SongGuesser.jsx";
import WinScreen from "./WinScreen.jsx";
import "./App.css";

function App() {
  const [startSong, setStartSong] = useState("");
  const [endSong, setEndSong] = useState("");
  const [songPath, setSongPath] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [songGuess, setSongGuess] = useState("");
  const [wonGame, setWonGame] = useState(false);
  const [difficulty, setDifficulty] = useState(2);
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
    if (currentSong && currentSong != startSong) {
      setGuessedSongs((prevGuessedSongs) => [...prevGuessedSongs, currentSong]);
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
        <GameOptions onToggleMotifs={toggleMotifs} />

        {wonGame && <WinScreen newGame={newGame} />}

        <div className="song-container">
          <div className="motif-container">
            <SongBox song={startSong} showMotifs={showMotifs} />
          </div>
          <div className="arrow">{"->"}</div>
          {guessedSongs.map((song) => {
            return (
              <>
                <div className="motif-container">
                  <SongBox song={song} showMotifs={showMotifs} />
                </div>
                <div className="arrow">{"->"}</div>
              </>
            );
          })}
          {!wonGame && (
            <>
              <GuessBox />
              <div className="arrow">{"->"}</div>
            </>
          )}
          <div className="motif-container">
            <SongBox song={endSong} showMotifs={showMotifs} />
          </div>
        </div>
        <SongGuesser
          onSubmit={handleSubmit}
          onSongGuess={setSongGuess}
          songGuess={songGuess}
          notSong={notSong}
          notNeighbor={notNeighbor}
          setNotNeighbor={setNotNeighbor}
          setNotSong={setNotSong}
        />
      </div>
    </>
  );
}

export default App;
