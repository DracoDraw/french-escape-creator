
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  departure: string;
  return: string;
  activities: string;
  budget: string;
  origin: string;
  tripType: string;
  previousTrip: string;
  foodPreferences: string;
  places: string;
  language: string;
}

const TripGenerator = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    departure: '',
    return: '',
    activities: '',
    budget: '',
    origin: '',
    tripType: '',
    previousTrip: '',
    foodPreferences: '',
    places: '',
    language: 'Français'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Voyage personnalisé en cours de création",
        description: "Nous préparons votre itinéraire personnalisé. Vous recevrez un email avec tous les détails sous peu.",
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h3 className="font-serif text-3xl text-center mb-6 text-navy">Créez votre voyage sur mesure</h3>
      <p className="text-center mb-8 text-gray-600">
        Répondez à quelques questions et notre assistant de voyage expert vous créera un itinéraire personnalisé en France.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
              Date de départ
            </label>
            <input
              id="departure"
              name="departure"
              type="date"
              value={formData.departure}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="return" className="block text-sm font-medium text-gray-700">
              Date de retour
            </label>
            <input
              id="return"
              name="return"
              type="date"
              value={formData.return}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget (en euros)
            </label>
            <input
              id="budget"
              name="budget"
              type="number"
              placeholder="Ex: 2000"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
              Pays d'origine
            </label>
            <input
              id="origin"
              name="origin"
              type="text"
              placeholder="Ex: Belgique"
              value={formData.origin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tripType" className="block text-sm font-medium text-gray-700">
              Type de voyage
            </label>
            <select
              id="tripType"
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              required
            >
              <option value="">Sélectionnez</option>
              <option value="Culturel">Culturel</option>
              <option value="Gastronomique">Gastronomique</option>
              <option value="Nature">Nature</option>
              <option value="Romantique">Romantique</option>
              <option value="Aventure">Aventure</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="places" className="block text-sm font-medium text-gray-700">
              Lieux à visiter
            </label>
            <input
              id="places"
              name="places"
              type="text"
              placeholder="Ex: Paris, Bordeaux"
              value={formData.places}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="activities" className="block text-sm font-medium text-gray-700">
            Activités souhaitées
          </label>
          <textarea
            id="activities"
            name="activities"
            rows={3}
            placeholder="Ex: Visite de musées, dégustation de vins, randonnées..."
            value={formData.activities}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="foodPreferences" className="block text-sm font-medium text-gray-700">
            Préférences alimentaires
          </label>
          <textarea
            id="foodPreferences"
            name="foodPreferences"
            rows={2}
            placeholder="Ex: Végétarien, allergies, restaurants gastronomiques..."
            value={formData.foodPreferences}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
          />
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-navy text-white font-medium rounded-md hover:bg-navy/90 transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Création en cours...
              </>
            ) : (
              <>
                <Send size={20} />
                Créer mon voyage
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripGenerator;
