
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Close the menu if it's open
    setIsMobileMenuOpen(false);
    
    // Handle home navigation
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Handle other section navigation
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Accueil', path: '/', sectionId: 'home' },
    { name: 'Nos Voyages', path: '/#voyages', sectionId: 'voyages' },
    { name: 'Créer Votre Voyage', path: '/#generateur', sectionId: 'generateur' },
    { name: 'Contact', path: '/#contact', sectionId: 'contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 px-6 md:px-12 ${
        isScrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="font-serif text-2xl md:text-3xl text-navy transition-all hover:opacity-80"
          onClick={(e) => scrollToSection('home', e)}
        >
          La France for-me-dable
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`text-navy hover:text-navy/70 transition-all text-sm font-medium ${
                location.pathname + location.hash === item.path ? 'border-b-2 border-navy' : ''
              }`}
              onClick={(e) => scrollToSection(item.sectionId, e)}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-navy" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`text-navy hover:text-navy/70 transition-all text-base font-medium py-2 ${
                location.pathname + location.hash === item.path ? 'border-l-4 border-navy pl-2' : ''
              }`}
              onClick={(e) => scrollToSection(item.sectionId, e)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
