import { motion } from "framer-motion";
const GameOptions = ({
  onToggleMotifs,
  showMotifs,
  difficulty,
  setDifficulty,
  setEndScreen,
  endlessMode,
  onRandom,
  setRandom,
}) => {
  const MAX_DIFFICULTY = 5;
  const MIN_DIFFICULTY = 2;
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
          {endlessMode && (
            <>
              <div className="game-option">Songs To Guess:</div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`button-border game-options ${difficulty == 2 && !onRandom ? "selected" : ""}`}
                onMouseUp={() => {
                  setDifficulty(2);
                  setRandom(false);
                }}
              >
                {" "}
                1{" "}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`button-border game-options ${difficulty == 3 && !onRandom ? "selected" : ""}`}
                onMouseUp={() => {
                  setDifficulty(3);
                  setRandom(false);
                }}
              >
                {" "}
                2{" "}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`button-border game-options ${difficulty == 4 && !onRandom ? "selected" : ""}`}
                onMouseUp={() => {
                  setDifficulty(4);
                  setRandom(false);
                }}
              >
                {" "}
                3{" "}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`button-border game-options ${onRandom ? "selected" : ""}`}
                onMouseUp={() => {
                  var tempDiff =
                    Math.floor(
                      Math.random() * (MAX_DIFFICULTY - MIN_DIFFICULTY),
                    ) + MIN_DIFFICULTY;
                  setDifficulty(tempDiff);
                  setRandom(true);
                }}
              >
                {" "}
                Random{" "}
              </motion.div>
            </>
          )}
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
