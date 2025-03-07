export interface TripDay {
  activities: {
    time: string;
    description: string;
    cost?: string;
    imageSrc?: string;
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
    totalCost: "3 900 € pour 2 personnes",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    days: [
      {
        activities: [
          { 
            time: "10h00", 
            description: "Installation à l'hôtel Le Meurice",
            imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h00", 
            description: "Déjeuner au Comptoir du Relais",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "14h00", 
            description: "Visite de la Tour Eiffel avec accès prioritaire",
            imageSrc: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Croisière sur la Seine avec dîner romantique",
            imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
          }
        ],
        cost: "1 050 € pour 2 personnes"
      },
      {
        activities: [
          { 
            time: "9h00", 
            description: "Promenade à Montmartre et visite du Sacré-Cœur",
            imageSrc: "https://images.unsplash.com/photo-1501446529957-6226bd3c3805?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h00", 
            description: "Déjeuner libre dans un café local",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "15h00", 
            description: "Temps libre pour explorer les galeries d'art",
            imageSrc: "https://images.unsplash.com/photo-1531913764164-f152c22ccd77?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Dîner à l'hôtel Le Meurice",
            imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          }
        ],
        cost: "400 € pour 2 personnes"
      },
      {
        activities: [
          { 
            time: "10h00", 
            description: "Découverte des jardins du Luxembourg",
            imageSrc: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h00", 
            description: "Déjeuner libre dans le quartier",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "14h00", 
            description: "Shopping dans le Marais",
            imageSrc: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Dîner au Jules Verne",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          }
        ],
        cost: "850 € pour 2 personnes"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour explorer Paris" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "19h00", description: "Dîner à l'hôtel Le Meurice" }
        ],
        cost: "400 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport" }
        ],
        cost: "200 € (pour 2 personnes)"
      }
    ]
  },
  {
    id: "azur-eternel",
    title: "Azur Éternel",
    subtitle: "Élégance sur la Côte d'Azur",
    description: "Vivez un séjour de luxe sur la French Riviera avec ce voyage de 5 jours entre Nice, Cannes et Monaco. Profitez des plages de la Méditerranée, des activités nautiques et découvrez le glamour de la Côte d'Azur.",
    region: "Provence-Alpes-Côte d'Azur",
    totalCost: "2 700 € pour 2 personnes",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1503696967350-ad1874122058?q=80&w=1707&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    days: [
      {
        activities: [
          { 
            time: "10h00", 
            description: "Installation à l'Hôtel Negresco",
            imageSrc: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h00", 
            description: "Déjeuner au Bistrot Gourmand",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "14h00", 
            description: "Promenade sur la Promenade des Anglais",
            imageSrc: "https://images.unsplash.com/photo-1525685210123-d0e7e3ce9181?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Dîner à l'hôtel Negresco",
            imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          }
        ],
        cost: "700 € pour 2 personnes"
      },
      {
        activities: [
          { 
            time: "9h00", 
            description: "Départ pour Cannes",
            imageSrc: "https://images.unsplash.com/photo-1525685210123-d0e7e3ce9181?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "10h00", 
            description: "Visite du festival de cinéma",
            imageSrc: "https://images.unsplash.com/photo-1525685210123-d0e7e3ce9181?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h30", 
            description: "Déjeuner libre à Cannes",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "15h00", 
            description: "Retour à Nice et temps libre",
            imageSrc: "https://images.unsplash.com/photo-1525685210123-d0e7e3ce9181?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Dîner à l'hôtel Negresco",
            imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          }
        ],
        cost: "400 € pour 2 personnes"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour Monaco" },
          { time: "10h00", description: "Visite du Palais Princier" },
          { time: "12h00", description: "Déjeuner libre à Monaco" },
          { time: "15h00", description: "Visite du Casino de Monte-Carlo" },
          { time: "19h00", description: "Dîner à La Chèvre d'Or" }
        ],
        cost: "900 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "10h00", description: "Détente sur les plages de la Côte d'Azur" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Activités nautiques (jet-ski, voile, plongée)" },
          { time: "19h00", description: "Dîner à l'hôtel Negresco" }
        ],
        cost: "500 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport" }
        ],
        cost: "200 € (pour 2 personnes)"
      }
    ]
  },
  {
    id: "fleur-ocean",
    title: "À Fleur d'Océan",
    subtitle: "Échappée en Bretagne",
    description: "Partez à la découverte de la Bretagne avec ce séjour de 5 jours entre Saint-Malo, le Mont-Saint-Michel et Cancale. Profitez des paysages maritimes spectaculaires et de la gastronomie locale réputée.",
    region: "Bretagne",
    totalCost: "1 670 € pour 2 personnes",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1523130128854-210e133d6192?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    days: [
      {
        activities: [
          { 
            time: "10h00", 
            description: "Installation au Grand Hôtel des Thermes",
            imageSrc: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h00", 
            description: "Déjeuner libre à Saint-Malo",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "14h00", 
            description: "Visite de Saint-Malo et de ses remparts",
            imageSrc: "https://images.unsplash.com/photo-1591221585761-5abb71b17ae3?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Dîner à l'hôtel",
            imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          }
        ],
        cost: "450 € pour 2 personnes"
      },
      {
        activities: [
          { 
            time: "9h00", 
            description: "Départ pour le Mont-Saint-Michel",
            imageSrc: "https://images.unsplash.com/photo-1591221585761-5abb71b17ae3?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "10h00", 
            description: "Visite du Mont-Saint-Michel",
            imageSrc: "https://images.unsplash.com/photo-1591221585761-5abb71b17ae3?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h30", 
            description: "Déjeuner à La Mère Poulard",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "15h00", 
            description: "Retour à Saint-Malo et temps libre",
            imageSrc: "https://images.unsplash.com/photo-1591221585761-5abb71b17ae3?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Dîner à l'hôtel",
            imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          }
        ],
        cost: "320 € pour 2 personnes"
      },
      {
        activities: [
          { time: "10h00", description: "Promenade à Dinard" },
          { time: "12h00", description: "Déjeuner libre à Dinard" },
          { time: "14h00", description: "Visite de Cancale et de ses parcs à huîtres" },
          { time: "19h00", description: "Dîner au Coquillage" }
        ],
        cost: "450 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour explorer la région" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "250 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport ou gare" }
        ],
        cost: "200 € (pour 2 personnes)"
      }
    ]
  },
  {
    id: "passion-vigneronne",
    title: "Passion Vigneronne",
    subtitle: "Voyage œnologique",
    description: "Découvrez les plus grands vignobles français avec ce voyage de 5 jours entre Bordeaux et la Bourgogne. Visitez des domaines prestigieux, participez à des dégustations exclusives et apprenez l'art de la vinification.",
    region: "Nouvelle-Aquitaine & Bourgogne",
    totalCost: "2 340 € (pour 2 personnes)",
    duration: "5 jours",
    imageSrc: "https://images.unsplash.com/photo-1602491399415-e12a76b39b5f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    days: [
      {
        activities: [
          { 
            time: "10h00", 
            description: "Installation aux Sources de Caudalie",
            imageSrc: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "12h00", 
            description: "Déjeuner libre à Bordeaux",
            imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          },
          { 
            time: "14h00", 
            description: "Visite de la Cité du Vin",
            imageSrc: "https://images.unsplash.com/photo-1609951651556-5334e2706168?q=80&w=2074&auto=format&fit=crop"
          },
          { 
            time: "19h00", 
            description: "Dîner au Chapon Fin",
            imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          }
        ],
        cost: "740 € pour 2 personnes"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour les vignobles du Médoc" },
          { time: "10h00", description: "Découverte des vignobles et dégustations" },
          { time: "12h30", description: "Déjeuner libre dans la région" },
          { time: "15h00", description: "Retour à Bordeaux et temps libre" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "500 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "9h00", description: "Départ pour la Bourgogne" },
          { time: "12h00", description: "Déjeuner libre en route" },
          { time: "15h00", description: "Visite des vignobles de la Côte de Nuits" },
          { time: "19h00", description: "Dîner à l'Hôtel Le Cep" }
        ],
        cost: "500 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "10h00", description: "Dégustations et visites de caves à Beaune" },
          { time: "12h00", description: "Déjeuner au Bistrot du Bord de l'Eau" },
          { time: "14h00", description: "Temps libre pour explorer Beaune" },
          { time: "19h00", description: "Dîner à l'hôtel" }
        ],
        cost: "400 € (pour 2 personnes)"
      },
      {
        activities: [
          { time: "10h00", description: "Temps libre pour les derniers achats" },
          { time: "12h00", description: "Déjeuner libre" },
          { time: "14h00", description: "Transfert à l'aéroport ou gare" }
        ],
        cost: "200 € (pour 2 personnes)"
      }
    ]
  }
];

export const getTrip = (id: string): Trip | undefined => {
  return trips.find(trip => trip.id === id);
};
