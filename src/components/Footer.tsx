
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white" id="contact">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl mb-4">La France for-me-dable</h3>
            <p className="mb-4 opacity-80 text-sm">
              Voyagez avec élégance et découvrez les trésors cachés de la France grâce à nos itinéraires soigneusement élaborés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <a href="#voyages" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Nos Voyages
                </a>
              </li>
              <li>
                <a href="#generateur" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Créer Votre Voyage
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-medium text-lg mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/voyage/paris-romantique" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Paris
                </Link>
              </li>
              <li>
                <Link to="/voyage/azur-eternel" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Côte d'Azur
                </Link>
              </li>
              <li>
                <Link to="/voyage/fleur-ocean" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Bretagne
                </Link>
              </li>
              <li>
                <Link to="/voyage/passion-vigneronne" className="opacity-80 hover:opacity-100 transition-opacity text-sm">
                  Bordeaux & Bourgogne
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span className="text-sm opacity-80">
                  15 Rue de Rivoli, 75001 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span className="text-sm opacity-80">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span className="text-sm opacity-80">contact@lafranceformedable.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-70">
          <p>&copy; {currentYear} La France for-me-dable. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
