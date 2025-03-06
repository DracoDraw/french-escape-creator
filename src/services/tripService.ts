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

export async function generateTrip(params: TripParams): Promise<TripResult> {
  try {
    console.log('Envoi des paramètres:', params);
    console.log('URL de l\'API:', 'https://french-escape-creator.onrender.com/api/generate-trip');

    const response = await fetch('https://french-escape-creator.onrender.com/api/generate-trip', {
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