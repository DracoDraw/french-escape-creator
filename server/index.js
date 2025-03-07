import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const MISTRAL_API_KEY = 'NozTZhT5xL6mWa3JSRKkiHrwaTeSwWjf';

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Route de test pour la racine
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Fonction pour vérifier le nombre de jours dans la réponse
function verifyDayCount(content, expectedDays) {
  // Vérifie le format exact "**Jour X :" où X est un nombre
  const dayMatches = content.match(/\*\*Jour \d+ :/g);
  if (!dayMatches) return false;
  
  // Vérifie que nous avons le bon nombre de jours
  if (dayMatches.length !== expectedDays) return false;
  
  // Vérifie que les jours sont numérotés de 1 à expectedDays
  const dayNumbers = dayMatches.map(day => parseInt(day.match(/\d+/)[0]));
  const expectedNumbers = Array.from({length: expectedDays}, (_, i) => i + 1);
  
  // Vérifie que tous les numéros attendus sont présents
  return expectedNumbers.every(num => dayNumbers.includes(num));
}

// Route pour la génération de voyage
app.post('/api/generate-trip', async (req, res) => {
  try {
    console.log('Requête reçue:', {
      headers: req.headers,
      body: req.body,
      origin: req.headers.origin
    });

    let attempts = 0;
    const maxAttempts = 3;
    let validResponse = false;
    let content = "";

    while (!validResponse && attempts < maxAttempts) {
      attempts++;
      console.log(`Tentative ${attempts}/${maxAttempts}`);

      const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`
        },
        body: JSON.stringify({
          model: "mistral-medium",
          messages: [{
            role: "user",
            content: `Tu es un assistant de voyage expert spécialisé dans la création d'itinéraires personnalisés en France.

⚠️ DURÉE OBLIGATOIRE : ${req.body.duration} JOURS
⚠️ SI TU NE GÉNÈRES PAS EXACTEMENT ${req.body.duration} JOURS, TA RÉPONSE SERA REJETÉE
⚠️ COMPTE BIEN LES JOURS AVANT DE RÉPONDRE

Voici les informations du voyage à générer :
- Durée EXACTE : ${req.body.duration} jours (OBLIGATOIRE)
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

RÈGLES CRITIQUES À SUIVRE :
1. ⚠️ GÉNÉRER EXACTEMENT ${req.body.duration} JOURS - C'EST NON NÉGOCIABLE
2. ⚠️ CHAQUE JOUR DOIT AVOIR SON PROGRAMME (Jour 1 à Jour ${req.body.duration})
3. ⚠️ LE BUDGET TOTAL DOIT ÊTRE PROCHE DE ${req.body.budget}€
4. INCLURE TOUS LES COÛTS

FORMAT DE RÉPONSE STRICT :
${Array.from({length: req.body.duration}, (_, i) => `**Jour ${i + 1} : [Ville]**
- [Heure] : [Activité] (coût : XX€)
- [Heure] : [Activité] (coût : XX€)
...`).join('\n\n')}

**Détail des coûts** :
- Transports internationaux : XXX€
- Transports locaux : XXX€
- Hébergement : XXX€ (${req.body.duration} nuits)
- Activités : XXX€
- Repas : XXX€ (${req.body.duration} jours)
- Extras : XXX€

**Budget total du voyage : XXXX€**

⚠️ VÉRIFICATION FINALE OBLIGATOIRE :
1. As-tu généré EXACTEMENT ${req.body.duration} jours ? [OUI/NON]
2. As-tu numéroté les jours de 1 à ${req.body.duration} ? [OUI/NON]
3. Le budget est-il proche de ${req.body.budget}€ ? [OUI/NON]

Si une seule réponse est NON, ta réponse sera rejetée.`
          }]
        })
      });

      const data = await mistralResponse.json();
      content = data.choices[0].message.content;

      // Vérifie si la réponse contient le bon nombre de jours
      validResponse = verifyDayCount(content, parseInt(req.body.duration));

      if (!validResponse) {
        console.log(`Réponse invalide (${attempts}/${maxAttempts}), nouvelle tentative...`);
        if (attempts >= maxAttempts) {
          throw new Error(`Impossible de générer un itinéraire avec ${req.body.duration} jours après ${maxAttempts} tentatives`);
        }
        continue;
      }
    }

    res.json({
      response: content
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