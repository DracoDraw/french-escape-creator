import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const MISTRAL_API_KEY = 'NozTZhT5xL6mWa3JSRKkiHrwaTeSwWjf';

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configuration CORS avec les URLs autorisées
app.use(cors({
  origin: [
    'https://lafrancefor-me-dable-gjz1si7sq-dracodraws-projects.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Route de test pour la racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: port
  });
});

// Route de test pour l'API
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

// Route pour la génération de voyage
app.post('/api/generate-trip', async (req, res) => {
  try {
    console.log('Requête reçue:', {
      headers: req.headers,
      body: req.body,
      origin: req.headers.origin
    });

    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [{
          role: "user",
          content: `Tu es un assistant de voyage expert spécialisé dans la création d'itinéraires personnalisés en France. Ton rôle est de générer un programme de voyage jour par jour, en fonction des réponses fournies par l'utilisateur via un formulaire.

Voici les informations du voyage à générer :
- Jour de départ : ${req.body.startDate}
- Jour de retour : ${req.body.endDate}
- Activités souhaitées : ${req.body.activities}
- Budget total : ${req.body.budget}€
- Pays d'origine : ${req.body.origin}
- Type de voyage : ${req.body.tripType}
- Voyage précédent : ${req.body.previousTrip}
- Préférences alimentaires : ${req.body.foodPreferences}
- Lieux à visiter : ${req.body.location}
- Langue de sortie : ${req.body.language}
- Périmètre de voyage : ${req.body.travelScope === 'city' ? 'Rester dans la même ville' : 'Explorer la région'}

IMPORTANT : Tu DOIS suivre EXACTEMENT le format de réponse demandé ci-dessous, en incluant TOUS les coûts et TOUS les transports.

Si le périmètre est "city" :
- Toutes les activités doivent être dans la même ville
- Les transports doivent être uniquement locaux (métro, bus, taxi, marche)
- Pas de déplacements vers d'autres villes

Si le périmètre est "region" :
- Inclus des visites dans différentes villes de la région
- Inclus les transports entre les villes
- Adapte le programme pour optimiser les temps de trajet

Format de réponse OBLIGATOIRE :

**Jour 1 : [Ville]**
- [Heure] : [Transport] (coût : XX€)
- [Heure] : [Activité] (coût : XX€)
- [Heure] : [Transport] (coût : XX€)
- [Heure] : [Activité] (coût : XX€)
- Coût journalier : XXX€

**Jour 2 : [Ville]**
- [Heure] : [Transport] (coût : XX€)
- [Heure] : [Activité] (coût : XX€)
- [Heure] : [Transport] (coût : XX€)
- [Heure] : [Activité] (coût : XX€)
- Coût journalier : XXX€

**Détail des coûts** :
- Transports internationaux : XXX€
- Transports locaux : XXX€
- Hébergement : XXX€
- Activités : XXX€
- Repas : XXX€
- Extras : XXX€

**Budget total du voyage : XXXX€**

Règles strictes à suivre :
1. Inclus TOUJOURS les transports entre chaque activité avec leur coût
2. Inclus TOUJOURS le coût de chaque activité
3. Inclus TOUJOURS le coût de chaque repas
4. Inclus TOUJOURS le coût de l'hébergement
5. Inclus TOUJOURS les transports internationaux (aller-retour)
6. Le budget total DOIT être inférieur ou égal à ${req.body.budget}€
7. Chaque jour DOIT avoir un coût journalier détaillé
8. Les coûts DOIVENT être réalistes et à jour

Exemple de format correct :
**Jour 1 : Bordeaux**
- 09:00 : Transport depuis l'aéroport vers le centre-ville (coût : 15€)
- 10:00 : Visite de la Place de la Bourse (coût : 0€)
- 12:00 : Transport vers le restaurant (coût : 5€)
- 12:30 : Déjeuner au restaurant (coût : 25€)
- 14:00 : Transport vers le musée (coût : 5€)
- 14:30 : Visite du Musée des Beaux-Arts (coût : 12€)
Coût journalier : 62€

Merci de générer un itinéraire détaillé en respectant EXACTEMENT ce format.`
        }]
      })
    });

    const data = await mistralResponse.json();
    console.log('Réponse de Mistral:', data);

    if (!mistralResponse.ok) {
      throw new Error(`Erreur API Mistral: ${mistralResponse.status} - ${JSON.stringify(data)}`);
    }

    res.json({
      response: data.choices[0].message.content || "Aucune réponse générée"
    });

  } catch (error) {
    console.error('Erreur détaillée:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.toString()
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});