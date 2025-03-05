
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TripCard from '@/components/TripCard';
import TripGenerator from '@/components/TripGenerator';
import Footer from '@/components/Footer';
import { trips } from '@/data/trips';
import { useRevealOnScroll } from '@/utils/animationUtils';

const Index = () => {
  const { ref: sectionRef1, isRevealed: isSectionRevealed1 } = useRevealOnScroll(0.1);
  const { ref: sectionRef2, isRevealed: isSectionRevealed2 } = useRevealOnScroll(0.1);
  const { ref: sectionRef3, isRevealed: isSectionRevealed3 } = useRevealOnScroll(0.1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Voyages Section */}
      <section 
        id="voyages" 
        className="py-20 px-6 md:px-12 bg-cream"
        ref={sectionRef1}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${
            isSectionRevealed1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block bg-sand px-3 py-1 rounded-full text-sm font-medium text-navy mb-2">
              Découvrez nos itinéraires
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">Nos Voyages Exclusifs</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Des expériences soigneusement conçues pour vous faire découvrir le meilleur de la France, de son patrimoine culturel à sa gastronomie d'exception.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {trips.map((trip, index) => (
              <TripCard key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section 
        className="py-20 px-6 md:px-12 bg-navy text-white text-center"
        ref={sectionRef2}
      >
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${
          isSectionRevealed2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <blockquote className="font-serif text-2xl md:text-3xl italic mb-6">
            "Le voyage est une espèce de porte par où l'on sort de la réalité comme pour pénétrer dans une réalité inexplorée qui semble un rêve."
          </blockquote>
          <cite className="text-gold">— Guy de Maupassant</cite>
        </div>
      </section>
      
      {/* Generator Section */}
      <section 
        id="generateur" 
        className="py-20 px-6 md:px-12 bg-sand/50"
        ref={sectionRef3}
      >
        <div className={`max-w-7xl mx-auto transition-all duration-700 ${
          isSectionRevealed3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-12">
            <span className="inline-block bg-sand px-3 py-1 rounded-full text-sm font-medium text-navy mb-2">
              Personnalisez votre expérience
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">Créez Votre Voyage Sur Mesure</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Laissez notre assistant de voyage expert créer un itinéraire personnalisé qui correspond parfaitement à vos envies et à votre budget.
            </p>
          </div>
          
          <TripGenerator />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
