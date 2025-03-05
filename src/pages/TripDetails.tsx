
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Euro, MapPin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getTrip, Trip } from '@/data/trips';
import { preloadImage, useRevealOnScroll } from '@/utils/animationUtils';

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { ref: headerRef, isRevealed: isHeaderRevealed } = useRevealOnScroll(0.1);
  const { ref: contentRef, isRevealed: isContentRevealed } = useRevealOnScroll(0.1);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!id) {
      navigate('/');
      return;
    }

    const tripData = getTrip(id);
    if (!tripData) {
      navigate('/');
      return;
    }

    const loadTrip = async () => {
      try {
        await preloadImage(tripData.imageSrc);
        setTrip(tripData);
      } catch (error) {
        console.error('Failed to load image:', error);
        setTrip(tripData);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrip();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse text-navy font-serif text-2xl">Chargement...</div>
      </div>
    );
  }

  if (!trip) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Header */}
      <header 
        className="relative h-[60vh] w-full mt-16"
        ref={headerRef}
      >
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            isHeaderRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${trip.imageSrc})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center z-10 px-6">
          <div className={`transition-all duration-700 ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="font-serif text-4xl md:text-6xl mb-4">{trip.title}</h1>
            <p className="text-lg md:text-xl max-w-2xl opacity-90">{trip.subtitle}</p>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main 
        className="py-12 px-6 md:px-12"
        ref={contentRef}
      >
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-navy hover:text-navy/70 transition-all mb-8"
          >
            <ArrowLeft size={18} /> Retour aux voyages
          </button>
          
          {/* Trip Overview */}
          <div className={`transition-all duration-700 ${
            isContentRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
                <div>
                  <h2 className="font-serif text-3xl text-navy mb-2">{trip.title}</h2>
                  <p className="text-gray-600 mb-4">{trip.description}</p>
                </div>
                <div className="bg-sand/50 p-4 rounded-lg flex items-center gap-2 text-navy font-medium text-lg">
                  <Euro size={20} />
                  <span>{trip.totalCost}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-navy" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-navy" />
                  <span>{trip.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-navy" />
                  <span>Départs toute l'année</span>
                </div>
              </div>
            </div>
            
            {/* Itinerary */}
            <div className="mb-10">
              <h3 className="font-serif text-2xl text-navy mb-6">Itinéraire Détaillé</h3>
              
              <div className="space-y-8">
                {trip.days.map((day, dayIndex) => (
                  <div 
                    key={dayIndex} 
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="bg-navy text-white p-4">
                      <h4 className="font-medium">Jour {dayIndex + 1}</h4>
                    </div>
                    
                    <div className="p-6">
                      <ul className="space-y-4">
                        {day.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="flex items-start gap-4">
                            <span className="text-navy font-medium w-16 flex-shrink-0">
                              {activity.time}
                            </span>
                            <span className="text-gray-700">
                              {activity.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <span className="text-navy font-medium">
                          Coût estimé : {day.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-navy text-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="font-serif text-2xl mb-4">Prêt à Vivre cette Expérience?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Réservez dès maintenant pour garantir votre place et commencer à préparer votre voyage inoubliable à travers la France.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-3 bg-white text-navy font-medium rounded hover:bg-white/90 transition-all">
                  Réserver Maintenant
                </button>
                <button className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded hover:bg-white/10 transition-all">
                  Demander des Informations
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TripDetails;
