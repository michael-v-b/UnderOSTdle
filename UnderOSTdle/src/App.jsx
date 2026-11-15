import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SongManager from "./SongManager.jsx";
import SongBox from "./SongBox.jsx";
import "./App.css";

function App() {
  const [startSong, setStartSong] = useState("");
  const [endSong, setEndSong] = useState("");
  const [songGuess, setSongGuess] = useState("");
  const SongManagerRef = useRef(null);

  useEffect(() => {
    var songs = [];
    SongManagerRef.current.initializeSongs();
    songs = SongManagerRef.current.getSongs(2);
    setStartSong(songs[0]);
    setEndSong(songs[1]);
  }, []);

  const handleSubmit = () => {
    const result = SongManagerRef.current.checkSong(songGuess);
    if (result) {
      console.log("result was true");
    } else {
      console.log("result was false");
    }
  };

  return (
    <>
      <div className="page-container">
        <SongManager ref={SongManagerRef} />
        <div>
          <h1>UnderOSTdle</h1>
          <p>
            Connect the 2 Undertale/Deltarune songs using their shared Motifs!
          </p>
        </div>
        <div>Songs to Connect:</div>
        <div className="song-container">
          <SongBox song={startSong} />
          <div className="guess-box">?</div>
          <SongBox song={endSong} />
        </div>
        <div className="song-guess-container">
          <input
            className="song-input"
            placeholder="Enter a song"
            onChange={(event) => {
              setSongGuess(event.target.value);
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
      </div>
    </>
  );
}

export default App;
