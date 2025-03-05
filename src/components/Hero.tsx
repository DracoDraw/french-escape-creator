
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { preloadImages } from '../utils/animationUtils';

const heroImages = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop", // Paris
  "https://images.unsplash.com/photo-1525685210123-d0e7e3ce9181?q=80&w=2070&auto=format&fit=crop", // Nice
  "https://images.unsplash.com/photo-1591221585761-5abb71b17ae3?q=80&w=2070&auto=format&fit=crop", // Mont St. Michel
  "https://images.unsplash.com/photo-1609951651556-5334e2706168?q=80&w=2074&auto=format&fit=crop", // Vineyard
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const preload = async () => {
      try {
        await preloadImages(heroImages);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to preload images:', error);
        setIsLoading(false);
      }
    };
    
    preload();
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToVoyages = () => {
    const voyagesSection = document.getElementById('voyages');
    if (voyagesSection) {
      voyagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isLoading || isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          backgroundImage: `url(${heroImages[currentImageIndex]})`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white text-center z-10 px-6">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 animate-fade-in-down">
          Découvrez la France
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in opacity-90">
          Voyagez avec élégance et découvrez les trésors cachés de la France, des rues romantiques de Paris aux vignobles ensoleillés de la Bourgogne.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <a 
            href="#voyages" 
            className="px-8 py-3 bg-white text-navy font-medium rounded hover:bg-white/90 transition-all"
            onClick={(e) => {
              e.preventDefault();
              scrollToVoyages();
            }}
          >
            Nos Voyages
          </a>
          <a 
            href="#generateur" 
            className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded hover:bg-white/10 transition-all"
          >
            Créer Votre Voyage
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

export default Hero;
