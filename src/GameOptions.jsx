import { motion } from "framer-motion";

const GameOptions = ({
  onToggleMotifs,
  showMotifs,
  difficulty,
  setDifficulty,
  setEndScreen,
}) => {
  return (
    <>
      <div className="game-options-container">
        <div className="difficulty-container">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`button-border game-options show-motifs ${showMotifs ? "selected" : ""}`}
            onMouseUp={onToggleMotifs}
          >
            {" "}
            Show Motifs{" "}
          </motion.div>
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
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onMouseUp={() => {
            setEndScreen(true);
          }}
          className="button-border game-options"
        >
          Show Solution
        </motion.div>
      </div>
    </>
  );
};
export default GameOptions;
