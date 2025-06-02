import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X } from 'lucide-react';

const categories = ['All', 'Living Room', 'Kitchen', 'Bedroom', 'Office', 'Bathroom'];

const galleryItems = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Living Room",
    title: "Modern Minimalist Living Room"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Kitchen",
    title: "Contemporary Kitchen Design"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Bedroom",
    title: "Serene Bedroom Interior"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Office",
    title: "Productive Workspace"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Bathroom",
    title: "Elegant Bathroom Design"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Living Room",
    title: "Cozy Reading Corner"
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Kitchen",
    title: "Modern Cooking Space"
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Bedroom",
    title: "Luxurious Master Bedroom"
  }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<null | {
    id: number;
    image: string;
    title: string;
    category: string;
  }>(null);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Calculate total width to slide
  const slideWidth = 320 * filteredItems.length;

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [0, -slideWidth],
        transition: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: filteredItems.length * 2.5,
          ease: 'linear',
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, filteredItems.length, slideWidth, controls]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Our Portfolio
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our collection of beautifully designed spaces that showcase our attention to detail and commitment to quality.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Gallery Carousel */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6"
            style={{ width: filteredItems.length * 320 }}
            animate={controls}
          >
            {filteredItems.concat(filteredItems).map((item, idx) => (
              <div
                key={item.id + '-' + idx}
                className="relative cursor-pointer overflow-hidden rounded-lg min-w-[300px] max-w-[320px] h-80 bg-gray-100 flex-shrink-0 group"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  className="w-full rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                  <h3 className="text-xl font-medium">{selectedImage.title}</h3>
                  <p className="text-white/80">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;