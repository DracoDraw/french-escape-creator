
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { generateTrip } from '@/services/dataTourismeService';

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
  email: string;
  travelers: string;
}

interface TripResult {
  success: boolean;
  tripData?: {
    destination: string;
    duration: number;
    startDate: string;
    endDate: string;
    budget: string;
    tripType: string;
    itinerary: Record<string, any[]>;
  };
  message?: string;
}

const TripGenerator = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [tripResult, setTripResult] = useState<TripResult | null>(null);
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
    language: 'Français',
    email: '',
    travelers: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTripResult(null);
    
    try {
      // Appel au service pour générer le voyage
      const result = await generateTrip({
        places: formData.places,
        activities: formData.activities,
        tripType: formData.tripType,
        budget: formData.budget,
        departure: formData.departure,
        return: formData.return
      });
      
      setTripResult(result);
      
      if (result.success) {
        toast({
          title: "Voyage personnalisé créé",
          description: `Nous avons créé votre itinéraire personnalisé pour ${formData.travelers} voyageur(s). Vous recevrez un email à ${formData.email} avec tous les détails sous peu.`,
        });
      } else {
        toast({
          title: "Erreur lors de la création du voyage",
          description: result.message || "Une erreur est survenue, veuillez réessayer.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création du voyage:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de votre voyage, veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h3 className="font-serif text-3xl text-center mb-6 text-navy">Créez votre voyage sur mesure</h3>
      <p className="text-center mb-8 text-gray-600">
        Répondez à quelques questions et notre assistant de voyage expert vous créera un itinéraire personnalisé en France.
      </p>

      {!tripResult ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
                Nombre de voyageurs <span className="text-red-500">*</span>
              </label>
              <select
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? 'voyageur' : 'voyageurs'}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
                Date de départ <span className="text-red-500">*</span>
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
                Date de retour <span className="text-red-500">*</span>
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
                Budget (en euros) <span className="text-red-500">*</span>
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
                Ville de départ <span className="text-red-500">*</span>
              </label>
              <input
                id="origin"
                name="origin"
                type="text"
                placeholder="Ex: Bruxelles, Belgique"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500">Pour nous aider à choisir le meilleur aéroport de départ</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="tripType" className="block text-sm font-medium text-gray-700">
                Type de voyage <span className="text-red-500">*</span>
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
                Lieux à visiter <span className="text-red-500">*</span>
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

          <div className="space-y-2">
            <label htmlFor="previousTrip" className="block text-sm font-medium text-gray-700">
              Voyages précédents en France (optionnel)
            </label>
            <textarea
              id="previousTrip"
              name="previousTrip"
              rows={2}
              placeholder="Ex: Paris en 2019, Côte d'Azur en 2021..."
              value={formData.previousTrip}
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
      ) : (
        <div className="bg-cream p-6 rounded-lg shadow">
          {tripResult.success ? (
            <>
              <h4 className="font-serif text-2xl text-navy mb-4">Votre voyage personnalisé</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h5 className="font-semibold text-lg mb-2">Informations générales</h5>
                  <ul className="space-y-2">
                    <li><span className="font-medium">Destination:</span> {tripResult.tripData?.destination}</li>
                    <li><span className="font-medium">Dates:</span> Du {tripResult.tripData?.startDate} au {tripResult.tripData?.endDate}</li>
                    <li><span className="font-medium">Durée:</span> {tripResult.tripData?.duration} jours</li>
                    <li><span className="font-medium">Budget estimé:</span> {tripResult.tripData?.budget} €</li>
                    <li><span className="font-medium">Type de voyage:</span> {tripResult.tripData?.tripType}</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h5 className="font-semibold text-lg mb-2">Itinéraire</h5>
                  {Object.entries(tripResult.tripData?.itinerary || {}).map(([date, attractions]) => (
                    <div key={date} className="mb-4">
                      <h6 className="font-medium text-navy border-b pb-1 mb-2">
                        {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </h6>
                      <ul className="space-y-2 pl-4">
                        {(attractions as any[]).map((attraction, index) => (
                          <li key={index} className="list-disc">
                            <span className="font-medium">{attraction.name}</span>
                            {attraction.address?.addressLocality && 
                              <span className="text-sm text-gray-600"> - {attraction.address.addressLocality}</span>
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <p className="mb-4">Un email détaillé a été envoyé à {formData.email} avec toutes les informations pour votre voyage.</p>
                  <button
                    onClick={() => setTripResult(null)}
                    className="px-6 py-2 bg-navy text-white font-medium rounded-md hover:bg-navy/90 transition-all"
                  >
                    Créer un nouveau voyage
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h4 className="font-serif text-2xl text-navy mb-4">Oups !</h4>
              <p className="mb-6">{tripResult.message || "Une erreur est survenue lors de la création de votre voyage."}</p>
              <button
                onClick={() => setTripResult(null)}
                className="px-6 py-2 bg-navy text-white font-medium rounded-md hover:bg-navy/90 transition-all"
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TripGenerator;
