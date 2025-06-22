import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import videoSrc from '../assects/video.MOV';
import landing from '../assects/landing.jpg'
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  // onGetEstimate: () => void;
}

const Hero: React.FC<HeroProps> = ({ /* onGetEstimate */ }) => {
  const navigate = useNavigate();
  const words = ['Design', 'Manufacture', 'Innovate'];
      const colors = ['#00BFFF', '#8A2BE2', '#FF4500']; // Blue, Purple, Orange/Red
      const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 200; // Milliseconds per character
  const deletingSpeed = 150; // Milliseconds per character
  const delayBetweenWords = 1000; // Milliseconds to wait before typing next word

  useEffect(() => {
    let timeoutId: NodeJS.Timeout; // Explicitly type as NodeJS.Timeout

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

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${landing})`, 
          filter: 'brightness(0.5) blur(3px)'
        }}
      />
      
      {/* Content */}
      <div className="relative w-full px-2 sm:px-4 z-10 flex flex-col lg:flex-row items-center justify-between h-full">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col items-center justify-center text-white text-center mb-2 lg:mb-0"
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold leading-none">
              We
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-white/70 mt-2 max-w-xs">
              are a bunch of wildly passionate young minds
            </p>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold leading-none text-white">
            {displayedWord}
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="inline-block w-3 h-8 bg-gray-300 relative"
              style={{ height: '0.8em' }}
            >
              <div className="absolute w-2 h-2 bg-white rounded-full top-[-0.5rem] left-1/2 -translate-x-1/2"></div>
            </motion.span>
          </h1>
        </motion.div>
        {/* Right Side: Video */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex items-center justify-center mt-4"
        >
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Slogan Overlay */}
      {/* <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-3xl font-serif italic opacity-80">
        “Designed for the Discerning Eye”
      </div> */}

    </section>
  );
};

export default Hero;