import { motion } from "framer-motion";
const WinScreen = ({ newGame }) => {
  return (
    <>
      <div className="win-text">YOU WIN!!!</div>
      <motion.div
        className="play-again"
        whileHover={{ scale: 1.1, backgroundColor: "#494949" }}
        whileTap={{ scale: 0.9, backgroundColor: "#999999" }}
        onMouseUp={newGame}
      >
        Play Again?
      </motion.div>
    </>
  );
};
export default WinScreen;
