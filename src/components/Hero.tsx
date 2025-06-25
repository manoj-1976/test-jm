import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import videoSrc from '../assects/video.MOV';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const words = ['Design', 'Manufacture', 'Innovate'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 200;
  const deletingSpeed = 150;
  const delayBetweenWords = 1000;
  const [expCount, setExpCount] = useState(0);
  const [projCount, setProjCount] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        setDisplayedWord(fullWord.substring(0, displayedWord.length + 1));
        if (displayedWord.length === fullWord.length) {
          setIsDeleting(true);
          timeoutId = setTimeout(() => {}, delayBetweenWords);
        }
      } else {
        setDisplayedWord(fullWord.substring(0, displayedWord.length - 1));
        if (displayedWord.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    };
    timeoutId = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [displayedWord, isDeleting, currentWordIndex, words]);

  useEffect(() => {
    setExpCount(0);
    setProjCount(0);
    let expInterval: NodeJS.Timeout;
    let projInterval: NodeJS.Timeout;

    expInterval = setInterval(() => {
      setExpCount((prev) => {
        if (prev < 10) return prev + 1;
        clearInterval(expInterval);
        return 10;
      });
    }, 120);

    projInterval = setInterval(() => {
      setProjCount((prev) => {
        if (prev < 150) return prev + 5;
        clearInterval(projInterval);
        return 150;
      });
    }, 30);

    return () => {
      clearInterval(expInterval);
      clearInterval(projInterval);
    };
  }, [location.pathname]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      {/* Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-2xl"
        >
          We
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-base sm:text-lg md:text-xl text-white/80 mb-6 max-w-xl drop-shadow-2xl"
        >
          are a bunch of wildly passionate young minds
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 h-16 flex items-center justify-center drop-shadow-2xl"
        >
          {displayedWord}
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
            className="inline-block w-1 h-8 bg-white ml-1 align-bottom"
            style={{ height: '0.8em' }}
          />
        </motion.h2>
            <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/estimate')}
          className="px-8 py-3 rounded-full bg-yellow-600 text-white font-semibold text-lg shadow-lg hover:bg-yellow-700 transition mb-4"
            >
          Get Estimate
            </motion.button>
        <div className="mt-8 grid grid-cols-2 gap-6 max-w-md mx-auto w-full">
          <div className="bg-black/40 p-4 rounded-lg text-center">
            <span className="block text-3xl font-semibold text-white mb-1 flex justify-center">
              {expCount}+
            </span>
            <span className="text-white text-sm">Years Experience</span>
          </div>
          <div className="bg-black/40 p-4 rounded-lg text-center">
            <span className="block text-3xl font-semibold text-white mb-1 flex justify-center">
              {projCount}+
            </span>
            <span className="text-white text-sm">Projects Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;