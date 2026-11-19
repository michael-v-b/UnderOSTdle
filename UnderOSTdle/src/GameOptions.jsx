import { motion } from "framer-motion";

const GameOptions = ({ onToggleMotifs }) => {
  return (
    <>
      <div className="game-options-container">
        <motion.div
          whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
          whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
          className="button-border game-options"
          onMouseUp={onToggleMotifs}
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
    </>
  );
};
export default GameOptions;
