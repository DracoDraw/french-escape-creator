
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Trip } from '../data/trips';
import { useRevealOnScroll } from '../utils/animationUtils';

interface TripCardProps {
  trip: Trip;
  index: number;
}

const TripCard = ({ trip, index }: TripCardProps) => {
  const { ref, isRevealed } = useRevealOnScroll(0.1);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/voyage/${trip.id}`);
  };

  const animationDelay = index * 100;

  return (
    <div 
      ref={ref}
      className={`relative group rounded-lg overflow-hidden shadow-lg transition-all duration-500 h-[500px] md:h-[400px] cursor-pointer transform ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ 
        transitionDelay: `${animationDelay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        style={{ backgroundImage: `url(${trip.imageSrc})` }}
      />
      
      {/* Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? 'bg-black/50' : 'bg-black/30'
        }`}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg transition-all duration-500">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-2xl">{trip.title}</h3>
            <span className="font-medium text-lg">{trip.totalCost}</span>
          </div>
          <p className="text-sm mb-4 opacity-90">{trip.subtitle}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{trip.duration}</span>
            <button 
              className={`flex items-center gap-1 text-sm font-medium transition-all ${
                isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
            >
              Découvrir <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
