import { motion } from "framer-motion";

const GameOptions = ({ onToggleMotifs, difficulty, setDifficulty }) => {
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`button-border game-options ${difficulty == 2 ? "selected" : ""}`}
            onMouseUp={() => {
              setDifficulty(2);
            }}
          >
            {" "}
            Easy{" "}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`button-border game-options ${difficulty == 3 ? "selected" : ""}`}
            onMouseUp={() => {
              setDifficulty(3);
            }}
          >
            {" "}
            Medium{" "}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`button-border game-options ${difficulty == 4 ? "selected" : ""}`}
            onMouseUp={() => {
              setDifficulty(4);
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
