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
  stayInCity?: string;
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

    const response = await fetch('http://localhost:3000/api/generate-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

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