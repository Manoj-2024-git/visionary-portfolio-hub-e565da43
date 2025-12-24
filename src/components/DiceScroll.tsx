import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, X } from 'lucide-react';

const funFacts = [
  "Did you know? I've solved over 2000+ coding problems! 🎯",
  "Fun fact: My ML models achieve 98%+ accuracy! 🧠",
  "I speak Python, Java, and 5 more languages fluently! 💻",
  "Coffee consumed while coding: Approximately ∞ cups ☕",
  "My GitHub has 30+ repositories of awesome projects! 🚀",
  "I can detect 23 different skin diseases with AI! 🏥",
];

const quotes = [
  "The best way to predict the future is to create it. – Peter Drucker",
  "Data is the new oil. – Clive Humby",
  "AI is the electricity of the 21st century. – Andrew Ng",
  "Machine learning is the last invention humanity will ever need. – Nick Bostrom",
  "In God we trust; all others must bring data. – W. Edwards Deming",
  "The goal is to turn data into information, and information into insight. – Carly Fiorina",
];

const tips = [
  "Pro tip: Type 'help' in the terminal to explore my resume! 💡",
  "Tip: Click the cat to toggle dark/light mode! 🐱",
  "Tip: Try dragging the globe to rotate it! 🌍",
  "Pro tip: Check out my GitHub for code samples! 📦",
  "Tip: Scroll down to see my awesome projects! 👇",
  "Pro tip: The certificates link has all my certifications! 📜",
];

const allContent = [...funFacts, ...quotes, ...tips];

const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface DiceScrollProps {
  position: 'left' | 'right';
}

const DiceScroll = ({ position }: DiceScrollProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null);

    // Rolling animation
    let rolls = 0;
    const maxRolls = 15;

    const rollInterval = setInterval(() => {
      setCurrentFace(Math.floor(Math.random() * 6));
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        const finalFace = Math.floor(Math.random() * 6);
        setCurrentFace(finalFace);
        setResult(allContent[Math.floor(Math.random() * allContent.length)]);
        setIsRolling(false);
      }
    }, 100);
  };

  const CurrentDiceIcon = DiceIcons[currentFace];

  return (
    <>
      {/* Dice Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed ${position === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-40 p-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl hover:border-primary hover:text-primary transition-all duration-300 shadow-lg group`}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        title="Roll the dice!"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Dice5 size={24} className="text-foreground group-hover:text-primary" />
        </motion.div>
      </motion.button>

      {/* Dice Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => !isRolling && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative p-8 bg-card border border-border rounded-2xl shadow-2xl max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-center mb-6 gradient-text">
                🎲 Roll for Fun!
              </h3>

              {/* Dice Display */}
              <motion.div
                className="flex justify-center mb-6"
                animate={isRolling ? {
                  rotate: [0, 360, 720, 1080],
                  scale: [1, 1.2, 1, 1.2, 1]
                } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30">
                  <CurrentDiceIcon size={80} className="text-primary" />
                </div>
              </motion.div>

              {/* Roll Button */}
              <button
                onClick={rollDice}
                disabled={isRolling}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRolling ? 'Rolling...' : 'Roll the Dice!'}
              </button>

              {/* Result */}
              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-4 bg-secondary/50 rounded-xl text-center"
                  >
                    <p className="text-foreground">{result}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DiceScroll;
