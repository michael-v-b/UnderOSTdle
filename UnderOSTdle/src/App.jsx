import { useState } from "react";
import SongNavigator from "./SongNavigator.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SongNavigator />
      <section id="center">
        <div>
          <h1>UnderOSTdle</h1>
          <p>
            Connect the 2 Undertale/Deltarune songs using their shared Motifs!
          </p>
        </div>
        <div>Songs to Connect:</div>
        <div>THE WORLD REVOLVING</div>
        <div>Spamton Neo Fight</div>
        <input placeholder="Enter a song"></input>
      </section>
    </>
  );
}

export default App;
