import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { generateTrip, TripParams, TripResult } from '../services/tripService';
import { sendTripEmail } from '@/services/emailService';
import { useNavigate } from 'react-router-dom';

const TripGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [tripResult, setTripResult] = useState<TripResult>({
    success: false,
    tripData: undefined
  });
  const [formData, setFormData] = useState<TripParams>({
    location: '',
    duration: '',
    tripType: '',
    budget: '',
    destination: '',
    startDate: '',
    endDate: '',
    email: '',
    travelers: '',
    activities: '',
    foodPreferences: '',
    previousTrip: '',
    travelScope: 'city'
  });
  const [generatedTrip, setGeneratedTrip] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTripResult({
      success: false,
      tripData: undefined
    });
    
    try {
      const result = await generateTrip({
        location: formData.location,
        duration: formData.duration,
        tripType: formData.tripType,
        budget: formData.budget,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      
      setTripResult(result);
      
      if (result.success) {
        // Le texte généré par Mistral est dans result.tripData.itinerary
        console.log('Itinéraire généré:', result.tripData.itinerary);
        
        // Pour l'afficher dans ton interface
        setGeneratedTrip(result.tripData.itinerary);

        // Add logging to see what we're trying to send
        console.log('Preparing email with:', {
          to: formData.email,
          subject: `Your Trip to ${formData.destination}`,
          html: `<h1>Your Trip to ${formData.destination}</h1>
          <p>From: ${formData.startDate}</p>
          <p>To: ${formData.endDate}</p>
          <pre>${JSON.stringify(result.tripData, null, 2)}</pre>`
        });

        await sendTripEmail(
          formData.email,
          `Your Trip to ${formData.destination}`,
          `<h1>Your Trip to ${formData.destination}</h1>
          <p>From: ${formData.startDate}</p>
          <p>To: ${formData.endDate}</p>
          <pre>${JSON.stringify(result.tripData, null, 2)}</pre>`
        );

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
      console.error('Erreur:', error);
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

      {!tripResult.success ? (
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
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Ex: Paris, Nice, Bordeaux"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Durée (en jours) <span className="text-red-500">*</span>
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                min="1"
                max="14"
                placeholder="Ex: 5"
                value={formData.duration}
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
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                Ville de départ <span className="text-red-500">*</span>
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                placeholder="Ex: Paris, Bordeaux"
                value={formData.destination}
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
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Date de départ <span className="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                Date de retour <span className="text-red-500">*</span>
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="travelScope" className="block text-sm font-medium text-gray-700">
                Périmètre de voyage <span className="text-red-500">*</span>
              </label>
              <select
                id="travelScope"
                name="travelScope"
                value={formData.travelScope}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              >
                <option value="city">Rester dans la même ville</option>
                <option value="region">Explorer la région</option>
              </select>
              <p className="text-xs text-gray-500">Choisissez si vous souhaitez rester dans la même ville ou explorer la région</p>
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

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex items-center px-6 py-3 rounded-md text-white bg-navy hover:bg-navy/90 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Générer mon voyage
                </>
              )}
            </button>
          </div>
        </form>
      ) : tripResult.success ? (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-2xl font-serif text-navy mb-4">Votre voyage est prêt !</h4>
            <p className="text-gray-600 mb-6">
              Nous avons créé un itinéraire personnalisé pour {formData.travelers} voyageur(s).
            </p>
            <div className="bg-sand/20 p-6 rounded-lg">
              <h5 className="font-medium text-navy mb-2">Détails du voyage</h5>
              <p>Destination: {tripResult.tripData.destination}</p>
              <p>Durée: {tripResult.tripData.duration} jours</p>
              <p>Type de voyage: {tripResult.tripData.tripType}</p>
              <p>Budget: {tripResult.tripData.budget}€</p>
            </div>
            <div className="mt-6 space-y-4">
              <button
                onClick={() => navigate('/payment')}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md text-white bg-navy hover:bg-navy/90 transition-colors"
              >
                Réserver ce voyage pour 30€
              </button>
              <button
                onClick={() => {
                  setTripResult({
                    success: false,
                    tripData: undefined
                  });
                  navigate('/generer-voyage');
                }}
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700 transition-colors"
              >
                Créer un nouveau voyage
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-600 mb-4">{tripResult.message}</p>
          <button
            onClick={() => setTripResult({
              success: false,
              tripData: undefined
            })}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-navy hover:bg-navy/90 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Affichage du résultat */}
      {tripResult.success && tripResult.tripData && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">
            Votre Itinéraire pour {tripResult.tripData.destination}
          </h2>
          <div className="whitespace-pre-wrap">
            {tripResult.tripData.itinerary}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripGenerator;
