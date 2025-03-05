
export interface TripDay {
  activities: {
    time: string;
    description: string;
    cost?: string;
  }[];
  cost: string;
}

export interface Trip {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  region: string;
  totalCost: string;
  duration: string;
  imageSrc: string;
  days: TripDay[];
}

export const trips: Trip[] = [
  {
    id: "paris-romantique",
    title: "Paris Romantique",
    subtitle: "Découvrez la ville de l'amour",
    description: "Plongez dans l'atmosphère romantique de Paris avec ce séjour de 5 jours dans la ville lumière. Vous découvrirez les plus beaux monuments, les quartiers emblématiques et profiterez d'expériences gastronomiques inoubliables.",
    region: "Île-de-France",
    totalCost: "3 900 €",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    days: [
      {
        activities: [
          { time: "10h00", description: "Installation à l'hôtel Le Meurice" },
          { time: "12h00", description: "Déjeuner au Comptoir du Relais" },
          { time: "14h00", description: "Visite de la Tour Eiffel avec accès prioritaire" },
          { time: "19h00", description: "Croisière sur la Seine avec dîner romantique" }
        ],
        cost: "1 050 €"
      },
      {
        activities: [
          { time: "9h00", description: "Promenade à Montmartre et visite du Sacré-Cœur" },
          { time: "12h00", description: "Déjeuner libre dans un café local" },
          { time: "15h00", description: "Temps libre pour explorer les galeries d'art" },
          { time: "19h00", description: "Dîner à l'hôtel Le Meurice" }
        ],
        cost: "400 €"
      },
      {
        activities: [
          { time: "10h00", description: "Découverte des jardins du Luxembourg" },
          { time: "12h00", description: "Déjeuner libre dans le quartier" },
          { time: "14h00", description: "Shopping dans le Marais" },
          { time: "19h00", description: "Dîner au Jules Verne" }
        ],
        cost: "850 €"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour explorer Paris" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "19h00", description: "Dîner à l'hôtel Le Meurice" }
        ],
        cost: "400 €"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport" }
        ],
        cost: "200 €"
      }
    ]
  },
  {
    id: "azur-eternel",
    title: "Azur Éternel",
    subtitle: "Élégance sur la Côte d'Azur",
    description: "Vivez un séjour de luxe sur la French Riviera avec ce voyage de 5 jours entre Nice, Cannes et Monaco. Profitez des plages de la Méditerranée, des activités nautiques et découvrez le glamour de la Côte d'Azur.",
    region: "Provence-Alpes-Côte d'Azur",
    totalCost: "2 700 €",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1525685210123-d0e7e3ce9181?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        activities: [
          { time: "10h00", description: "Installation à l'Hôtel Negresco" },
          { time: "12h00", description: "Déjeuner au Bistrot Gourmand" },
          { time: "14h00", description: "Promenade sur la Promenade des Anglais" },
          { time: "19h00", description: "Dîner à l'hôtel Negresco" }
        ],
        cost: "700 €"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour Cannes" },
          { time: "10h00", description: "Visite du festival de cinéma" },
          { time: "12h30", description: "Déjeuner libre à Cannes" },
          { time: "15h00", description: "Retour à Nice et temps libre" },
          { time: "19h00", description: "Dîner à l'hôtel Negresco" }
        ],
        cost: "400 €"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour Monaco" },
          { time: "10h00", description: "Visite du Palais Princier" },
          { time: "12h00", description: "Déjeuner libre à Monaco" },
          { time: "15h00", description: "Visite du Casino de Monte-Carlo" },
          { time: "19h00", description: "Dîner à La Chèvre d'Or" }
        ],
        cost: "900 €"
      },
      {
        activities: [
          { time: "10h00", description: "Détente sur les plages de la Côte d'Azur" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Activités nautiques (jet-ski, voile, plongée)" },
          { time: "19h00", description: "Dîner à l'hôtel Negresco" }
        ],
        cost: "500 €"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport" }
        ],
        cost: "200 €"
      }
    ]
  },
  {
    id: "fleur-ocean",
    title: "À Fleur d'Océan",
    subtitle: "Échappée en Bretagne",
    description: "Partez à la découverte de la Bretagne avec ce séjour de 5 jours entre Saint-Malo, le Mont-Saint-Michel et Cancale. Profitez des paysages maritimes spectaculaires et de la gastronomie locale réputée.",
    region: "Bretagne",
    totalCost: "1 670 €",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1591221585761-5abb71b17ae3?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        activities: [
          { time: "10h00", description: "Installation au Grand Hôtel des Thermes" },
          { time: "12h00", description: "Déjeuner libre à Saint-Malo" },
          { time: "14h00", description: "Visite de Saint-Malo et de ses remparts" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "450 €"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour le Mont-Saint-Michel" },
          { time: "10h00", description: "Visite du Mont-Saint-Michel" },
          { time: "12h30", description: "Déjeuner à La Mère Poulard" },
          { time: "15h00", description: "Retour à Saint-Malo et temps libre" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "320 €"
      },
      {
        activities: [
          { time: "10h00", description: "Promenade à Dinard" },
          { time: "12h00", description: "Déjeuner libre à Dinard" },
          { time: "14h00", description: "Visite de Cancale et de ses parcs à huîtres" },
          { time: "19h00", description: "Dîner au Coquillage" }
        ],
        cost: "450 €"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour explorer la région" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "250 €"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport ou gare" }
        ],
        cost: "200 €"
      }
    ]
  },
  {
    id: "passion-vigneronne",
    title: "Passion Vigneronne",
    subtitle: "Voyage œnologique",
    description: "Découvrez les plus grands vignobles français avec ce voyage de 5 jours entre Bordeaux et la Bourgogne. Visitez des domaines prestigieux, participez à des dégustations exclusives et apprenez l'art de la vinification.",
    region: "Nouvelle-Aquitaine & Bourgogne",
    totalCost: "2 340 €",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1609951651556-5334e2706168?q=80&w=2074&auto=format&fit=crop",
    days: [
      {
        activities: [
          { time: "10h00", description: "Installation aux Sources de Caudalie" },
          { time: "12h00", description: "Déjeuner libre à Bordeaux" },
          { time: "14h00", description: "Visite de la Cité du Vin" },
          { time: "19h00", description: "Dîner au Chapon Fin" }
        ],
        cost: "740 €"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour les vignobles du Médoc" },
          { time: "10h00", description: "Découverte des vignobles et dégustations" },
          { time: "12h30", description: "Déjeuner libre dans la région" },
          { time: "15h00", description: "Retour à Bordeaux et temps libre" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "500 €"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour la Bourgogne" },
          { time: "12h00", description: "Déjeuner libre en route" },
          { time: "15h00", description: "Visite des vignobles de la Côte de Nuits" },
          { time: "19h00", description: "Dîner à l'Hôtel Le Cep" }
        ],
        cost: "500 €"
      },
      {
        activities: [
          { time: "10h00", description: "Dégustations et visites de caves à Beaune" },
          { time: "12h00", description: "Déjeuner au Bistrot du Bord de l'Eau" },
          { time: "14h00", description: "Temps libre pour explorer Beaune" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "400 €"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport ou gare" }
        ],
        cost: "200 €"
      }
    ]
  }
];

export const getTrip = (id: string): Trip | undefined => {
  return trips.find(trip => trip.id === id);
};
