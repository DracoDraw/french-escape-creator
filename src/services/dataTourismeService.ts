/**
 * Service pour interagir avec l'API DataTourisme
 */

import axios from 'axios';

console.log('Environment variables:', {
  opentripmap: import.meta.env.VITE_OPENTRIPMAP_API_KEY,
  sendgrid: import.meta.env.VITE_SENDGRID_API_KEY,
  sender: import.meta.env.VITE_SENDGRID_FROM_EMAIL
});

const API_URL = 'https://data.datatourisme.gouv.fr/api/v1/places';
const DATASET = 'datatourisme-places-20231220@datatourisme';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat';
const MISTRAL_API_KEY = 'ag:e5ee2d92:20250212:untitled-agent:76256efd';

export interface TripGeneratorParams {
  location: string;
  destination: string;
  activities: string;
  tripType: string;
  budget: string;
  departure: string;
  return: string;
  email?: string;
  places?: string;
  duration?: string;
  foodPreferences?: string;
  travelers: string;
  origin: string;
  previousTrip?: string;
}

interface DataTourismeSearchParams {
  location?: string;
  destination?: string;
  activities?: string;
  tripType?: string;
  budget?: string;
  limit?: number;
  departure?: string;
  return?: string;
  email?: string;
  places?: string;
  duration?: string;
}

interface DataTourismeAttraction {
  id: string;
  name: string;
  description: string;
  address: {
    addressLocality: string;
    addressRegion: string;
    streetAddress: string;
  };
  image: string;
  category: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  url?: string;
  telephone?: string;
  email?: string;
}

export interface TripParams {
  location: string;
  duration: string;
  tripType: string;
  budget: string;
}

export interface TripResult {
  success: boolean;
  message?: string;
  tripData?: {
    destination: string;
    duration: string;
    tripType: string;
    budget: string;
    itinerary: string;
  };
}

export async function searchAttractions(params: DataTourismeSearchParams): Promise<DataTourismeAttraction[]> {
  try {
    console.log('Searching for attractions in:', params.location);

    const response = await axios.get(API_URL, {
      params: {
        where: params.location,
        limit: params.limit || 20,
        type: 'TouristAttraction',
        format: 'json'
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    // Add this to see the raw response
    console.log('API Response:', response.data);

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid API response format');
    }

    return response.data.map((place: any) => ({
      id: place.id || '',
      name: place.name?.fr || place.name?.en || 'Unknown Name',
      description: place.description?.fr || place.description?.en || '',
      address: {
        addressLocality: place.address?.addressLocality || '',
        addressRegion: place.address?.addressRegion || '',
        streetAddress: place.address?.streetAddress || ''
      },
      image: place.image?.[0]?.url || '',
      category: place['@type'] || 'TouristAttraction',
      geo: {
        latitude: place.geo?.latitude || 0,
        longitude: place.geo?.longitude || 0
      },
      url: place.url || '',
      telephone: place.telephone || '',
      email: place.email || ''
    }));

  } catch (error) {
    console.error('DataTourisme API Error:', error);
    console.error('Full error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Return sample data for testing
    return [
      {
        id: '1',
        name: 'Tour Eiffel',
        description: 'Monument emblématique de Paris',
        address: {
          addressLocality: 'Paris',
          addressRegion: 'Île-de-France',
          streetAddress: 'Champ de Mars, 5 Avenue Anatole France'
        },
        image: 'https://example.com/eiffel.jpg',
        category: 'TouristAttraction',
        geo: {
          latitude: 48.8584,
          longitude: 2.2945,
        },
        url: 'https://www.toureiffel.paris',
        telephone: '+33 (0)8 92 70 12 39',
        email: ''
      },
      {
        id: '2',
        name: 'Musée du Louvre',
        description: 'Le plus grand musée d\'art au monde',
        address: {
          addressLocality: 'Paris',
          addressRegion: 'Île-de-France',
          streetAddress: 'Rue de Rivoli'
        },
        image: 'https://example.com/louvre.jpg',
        category: 'TouristAttraction',
        geo: {
          latitude: 48.8606,
          longitude: 2.3376,
        },
        url: 'https://www.louvre.fr',
        telephone: '+33 (0)1 40 20 53 17',
        email: ''
      }
    ];
  }
}

export async function generateTrip(params: TripParams): Promise<TripResult> {
  try {
    console.log('Generating trip for:', params.location);

    const response = await fetch('http://localhost:3000/api/generate-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    
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
