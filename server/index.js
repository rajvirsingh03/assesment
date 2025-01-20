const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const helmet = require('helmet');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Set Content-Security-Policy headers
// app.use(
//     helmet({
//       contentSecurityPolicy: false, // Temporarily disable CSP
//     })
//   );

// Google OAuth2 client setup
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
    // '12844776280-40ojcu592lmh4ije0lr5gm2js06gt6kc.apps.googleusercontent.com',
    // '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',
    // 'http://localhost:5000/auth/callback'
);
console.log(process.env.CLIENT_ID)

// Step 1: Initiate Google OAuth
app.get('/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
  res.redirect(authUrl);
});

// Step 2: Handle Google OAuth callback
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing authorization code.');
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.redirect(`http://localhost:3000?token=${tokens.access_token}`);
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send('Authentication failed.');
  }
});

// Step 3: Fetch Google Calendar events
app.get('/events', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  oAuth2Client.setCredentials({ access_token: token });

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  try {
    const events = await calendar.events.list({
      calendarId: 'primary',
      orderBy: 'startTime',
      singleEvents: true,
    });
    res.json(events.data.items);
  } catch (error) {
    res.status(500).send('Failed to fetch events.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
