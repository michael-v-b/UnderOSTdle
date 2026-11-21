import { Fragment, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SongManager from "./SongManager.jsx";
import GuessBox from "./GuessBox.jsx";
import GameOptions from "./GameOptions.jsx";
import SongBox from "./SongBox.jsx";
import SongGuesser from "./SongGuesser.jsx";
import WinScreen from "./WinScreen.jsx";
import TitleBar from "./TitleBar.jsx";

function EndlessGame() {
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
  const [showMotifs, setShowMotifs] = useState(false);
  const [solution, setSolution] = useState([]);
  const [endScreen, setEndScreen] = useState(false);
  const [endlessMode, setEndlessMode] = useState(true);
  const [wonDaily, setWonDaily] = useState(false);
  const [onRandom, setRandom] = useState(false);

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
  }, [difficulty, graphBuilt, endlessMode]);

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

    if (finalResult) {
      setWonGame(true);
      if (!endlessMode) {
        setWonDaily(true);
      }
    }
  };

  function newGame() {
    var songs;
    songs = SongManagerRef.current.getSongs(endlessMode, difficulty);
    setStartSong(songs[0]);
    setEndScreen(false);
    setCurrentSong(songs[0]);
    setEndSong(songs[1]);
    setGuessedSongs([]);
    setWonGame(false);
    setSongGuess("");
    setShowMotifs(false);
    setSolution(
      SongManagerRef.current.getSolution(
        songs[2],
        songs[0].name,
        songs[1].name,
      ),
    );
  }

  function toggleMotifs() {
    setShowMotifs(!showMotifs);
  }
  return (
    <>
      <TitleBar />
      <div className="page-container">
        <SongManager ref={SongManagerRef} />
        <div>
          <p className="instruction">
            <div>
              Connect the 2 Undertale/Deltarune songs using their shared motifs!
              This can take multiple songs
            </div>
            <div>It may take multiple songs to connect the 2</div>
          </p>
        </div>

        <div className="instruction-header">Songs to Connect:</div>

        <hr />
        <div className="game-type">Endless Mode</div>
        <GameOptions
          onToggleMotifs={toggleMotifs}
          showMotifs={showMotifs}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setEndScreen={setEndScreen}
          endlessMode={endlessMode}
          onRandom={onRandom}
          setRandom={setRandom}
        />

        {(wonGame || endScreen) && (
          <WinScreen
            newGame={newGame}
            wonGame={wonGame}
            wonDaily={wonDaily}
            solution={solution}
            mode={"endless"}
            onRandom={onRandom}
            setDifficulty={setDifficulty}
          />
        )}

        <div className="song-container">
          <div className="motif-container">
            <SongBox song={startSong} showMotifs={showMotifs} />
          </div>
          <div className="arrow">{"->"}</div>
          {guessedSongs.map((song, index) => {
            return (
              <Fragment key={index}>
                <div className="motif-container">
                  <SongBox song={song} showMotifs={showMotifs} />
                </div>
                <div className="arrow">{"->"}</div>
              </Fragment>
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
          currentSong={currentSong}
        />
      </div>
    </>
  );
}

export default EndlessGame;
