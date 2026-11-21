import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useState } from "react";

const WinScreen = ({ newGame, wonGame, solution }) => {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <>
      {wonGame && <Confetti />}
      <div className="win-text-container">
        {wonGame && <div className="win-text">YOU WIN!!!</div>}
        <div className="answer-reveal-container">
          <div className="answer">Shortest Solution: {solution.length}</div>
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
            whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
            onMouseUp={() => {
              setShowSolution(!showSolution);
            }}
            className="answer-reveal-button button-border"
          >
            Show?
          </motion.div>
        </div>
        {showSolution && (
          <div className="solution-container">
            {solution.map((songName) => {
              return <div className="solution-song">{songName}</div>;
            })}
          </div>
        )}
        <motion.div
          className="play-again"
          whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
          whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
          onMouseUp={newGame}
        >
          Play Again?
        </motion.div>
      </div>
    </>
  );
};
export default WinScreen;
