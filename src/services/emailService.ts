import sgMail from '@sendgrid/mail';
import axios from 'axios';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.warn('SendGrid API key is not set. Emails will not be sent.');
}
sgMail.setApiKey(SENDGRID_API_KEY || '');

interface TripDetails {
  destination: string;
  duration: number;
  startDate: string;
  endDate: string;
  budget: string;
  tripType: string;
  itinerary: Record<string, any[]>;
  travelers: string;
  email: string;
  activities?: string;
  foodPreferences?: string;
  previousTrip?: string;
}

export const sendTripEmail = async (to: string, subject: string, html: string) => {
  try {
    // Add logging to see what we're sending
    console.log('Sending email with data:', { to, subject, htmlLength: html?.length });
    
    if (!to || !subject || !html) {
      throw new Error('Missing required email fields');
    }

    const response = await axios.post('http://localhost:3000/api/send-email', {
      to,
      subject,
      html
    });
    console.log('Email response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Detailed email error:', error.response?.data || error);
    throw error;
  }
};

export async function sendTripEmailToUser(tripDetails: TripDetails): Promise<boolean> {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn('SendGrid API key is not set. Skipping email send.');
      return false;
    }

    // Format the itinerary for email
    const formattedItinerary = Object.entries(tripDetails.itinerary)
      .map(([date, attractions]) => {
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        return `
          <h3 style="color: #1a365d; margin-top: 20px;">${formattedDate}</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            ${attractions.map(attraction => `
              <li style="margin-bottom: 10px;">
                <strong>${attraction.name}</strong>
                ${attraction.address?.addressLocality ? `<br>📍 ${attraction.address.addressLocality}` : ''}
                ${attraction.description ? `<br>${attraction.description}` : ''}
              </li>
            `).join('')}
          </ul>
        `;
      })
      .join('');

    // Email template
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a365d; text-align: center;">Votre Voyage en France</h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1a365d; margin-top: 0;">Informations Générales</h2>
          <p><strong>Destination:</strong> ${tripDetails.destination}</p>
          <p><strong>Durée:</strong> ${tripDetails.duration} jours</p>
          <p><strong>Dates:</strong> Du ${new Date(tripDetails.startDate).toLocaleDateString('fr-FR')} au ${new Date(tripDetails.endDate).toLocaleDateString('fr-FR')}</p>
          <p><strong>Type de voyage:</strong> ${tripDetails.tripType}</p>
          <p><strong>Budget:</strong> ${tripDetails.budget}€</p>
          <p><strong>Nombre de voyageurs:</strong> ${tripDetails.travelers}</p>
        </div>

        ${tripDetails.activities ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a365d; margin-top: 0;">Activités Souhaitées</h2>
            <p>${tripDetails.activities}</p>
          </div>
        ` : ''}

        ${tripDetails.foodPreferences ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a365d; margin-top: 0;">Préférences Alimentaires</h2>
            <p>${tripDetails.foodPreferences}</p>
          </div>
        ` : ''}

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1a365d; margin-top: 0;">Itinéraire Détaillé</h2>
          ${formattedItinerary}
        </div>

        <div style="text-align: center; margin-top: 30px; color: #666;">
          <p>Pour toute question ou modification, n'hésitez pas à nous contacter.</p>
          <p>Bon voyage !</p>
        </div>
      </div>
    `;

    // Send email using SendGrid
    await sgMail.send({
      to: tripDetails.email,
      from: import.meta.env.VITE_SENDGRID_FROM_EMAIL || 'noreply@frenchescape.com',
      subject: 'Votre Voyage en France',
      html: emailContent,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
} 