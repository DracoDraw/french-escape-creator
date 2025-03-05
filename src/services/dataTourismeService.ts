
/**
 * Service pour interagir avec l'API DataTourisme
 */

const API_URL = 'https://diffuseur.datatourisme.fr/webservice/53be41e3d182ade354796fa1c63a438f/b21fdcac-2bbe-4be0-82a1-a43ac4d9a5f3';

interface DataTourismeSearchParams {
  categories?: string[];
  location?: string;
  limit?: number;
  offset?: number;
}

interface DataTourismeAttraction {
  id: string;
  name: string;
  description?: string;
  address?: {
    addressLocality?: string;
    addressRegion?: string;
  };
  image?: string;
  category?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

export async function searchAttractions(params: DataTourismeSearchParams): Promise<DataTourismeAttraction[]> {
  try {
    // Construction de la requête SPARQL pour l'API DataTourisme
    // Cette requête est simplifiée et devra être adaptée en fonction des besoins exacts
    const sparqlQuery = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX schema: <http://schema.org/>
      PREFIX dc: <http://purl.org/dc/elements/1.1/>
      
      SELECT ?id ?name ?description ?locality ?region ?image ?category ?lat ?long
      WHERE {
        ?id rdf:type schema:TouristAttraction .
        ?id schema:name ?name .
        
        OPTIONAL { ?id schema:description ?description . }
        OPTIONAL { 
          ?id schema:address ?address .
          OPTIONAL { ?address schema:addressLocality ?locality . }
          OPTIONAL { ?address schema:addressRegion ?region . }
        }
        OPTIONAL { ?id schema:image ?image . }
        OPTIONAL { ?id dc:type ?category . }
        OPTIONAL { 
          ?id schema:geo ?geo .
          ?geo schema:latitude ?lat .
          ?geo schema:longitude ?long .
        }
        
        ${params.location ? `FILTER(CONTAINS(LCASE(?locality), LCASE("${params.location}")) || CONTAINS(LCASE(?region), LCASE("${params.location}")))` : ''}
      }
      LIMIT ${params.limit || 10}
      OFFSET ${params.offset || 0}
    `;
    
    // Encodage de la requête pour l'URL
    const encodedQuery = encodeURIComponent(sparqlQuery);
    
    // Appel à l'API
    const response = await fetch(`${API_URL}?query=${encodedQuery}`);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transformation des résultats en objets structurés
    const attractions = data.results.bindings.map((item: any) => ({
      id: item.id?.value || '',
      name: item.name?.value || '',
      description: item.description?.value || '',
      address: {
        addressLocality: item.locality?.value || '',
        addressRegion: item.region?.value || '',
      },
      image: item.image?.value || '',
      category: item.category?.value || '',
      geo: item.lat?.value && item.long?.value ? {
        latitude: parseFloat(item.lat.value),
        longitude: parseFloat(item.long.value),
      } : undefined,
    }));
    
    return attractions;
  } catch (error) {
    console.error('Erreur lors de la recherche d\'attractions:', error);
    return [];
  }
}

export async function generateTrip(formData: {
  places: string;
  activities: string;
  tripType: string;
  budget: string;
  departure: string;
  return: string;
}): Promise<any> {
  try {
    // Recherche d'attractions en fonction des lieux spécifiés
    const attractions = await searchAttractions({
      location: formData.places,
      limit: 20
    });
    
    // Si aucune attraction n'est trouvée, on renvoie un message d'erreur
    if (attractions.length === 0) {
      return {
        success: false,
        message: "Aucune attraction trouvée pour les critères spécifiés."
      };
    }
    
    // Organisation des attractions par jour (simple répartition pour l'exemple)
    const startDate = new Date(formData.departure);
    const endDate = new Date(formData.return);
    const tripDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const itinerary = {};
    const attractionsPerDay = Math.ceil(attractions.length / tripDuration);
    
    for (let day = 0; day < tripDuration; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);
      
      const dayAttractions = attractions.slice(
        day * attractionsPerDay, 
        Math.min((day + 1) * attractionsPerDay, attractions.length)
      );
      
      itinerary[currentDate.toISOString().split('T')[0]] = dayAttractions;
    }
    
    return {
      success: true,
      tripData: {
        destination: formData.places,
        duration: tripDuration,
        startDate: formData.departure,
        endDate: formData.return,
        budget: formData.budget,
        tripType: formData.tripType,
        itinerary: itinerary
      }
    };
  } catch (error) {
    console.error('Erreur lors de la génération du voyage:', error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la génération de votre voyage."
    };
  }
}
