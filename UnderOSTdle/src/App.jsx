import { useState, useEffect, useRef } from "react";
import SongManager from "./SongManager.jsx";
import "./App.css";

function App() {
  const [startSong, setStartSong] = useState("");
  const [endSong, setEndSong] = useState("");
  const SongManagerRef = useRef(null);

  useEffect(() => {
    var songs = [];
    SongManagerRef.current.initializeSongs();
    songs = SongManagerRef.current.getSongs(2);
    setStartSong(songs[0]);
    setEndSong(songs[1]);
  }, []);

  return (
    <>
      <SongManager ref={SongManagerRef} />
      <section id="center">
        <div>
          <h1>UnderOSTdle</h1>
          <p>
            Connect the 2 Undertale/Deltarune songs using their shared Motifs!
          </p>
        </div>
        <div>Songs to Connect:</div>
        <div>{startSong}</div>
        <div>{endSong}</div>
        <input placeholder="Enter a song"></input>
      </section>
    </>
  );
}

export default App;
