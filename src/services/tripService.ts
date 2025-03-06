export interface TripParams {
  location: string;
  duration: string;
  tripType: string;
  budget: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  email?: string;
  travelers?: string;
  activities?: string;
  foodPreferences?: string;
  previousTrip?: string;
  travelScope?: 'city' | 'region';
}

export interface TripResult {
  success: boolean;
  message?: string;
  tripData?: {
    destination: string;
    duration: string;
    startDate?: string;
    endDate?: string;
    budget: string;
    tripType: string;
    itinerary: string;
    travelers?: string;
    activities?: string;
    foodPreferences?: string;
    previousTrip?: string;
  };
}

// Fonction de test pour vérifier la connexion au serveur
export async function testServerConnection(): Promise<boolean> {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'https://french-escape-creator.onrender.com';
    console.log('Test de connexion au serveur:', API_URL);

    const response = await fetch(`${API_URL}/api/test`);
    const data = await response.json();
    console.log('Réponse du test:', data);
    return true;
  } catch (error) {
    console.error('Erreur de connexion au serveur:', error);
    return false;
  }
}

export async function generateTrip(params: TripParams): Promise<TripResult> {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'https://french-escape-creator.onrender.com';
    console.log('Envoi des paramètres:', params);
    console.log('URL de l\'API:', `${API_URL}/api/generate-trip`);

    const response = await fetch(`${API_URL}/api/generate-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

    console.log('Statut de la réponse:', response.status);
    console.log('Headers de la réponse:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Réponse brute du serveur:', data);

    if (!data.response) {
      throw new Error('Pas de réponse générée');
    }

    return {
      success: true,
      tripData: {
        destination: params.location,
        duration: params.duration,
        tripType: params.tripType,
        budget: params.budget,
        startDate: params.startDate,
        endDate: params.endDate,
        travelers: params.travelers,
        activities: params.activities,
        foodPreferences: params.foodPreferences,
        previousTrip: params.previousTrip,
        itinerary: data.response
      }
    };

  } catch (error) {
    console.error('Erreur de génération:', error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la génération de votre voyage."
    };
  }
} 