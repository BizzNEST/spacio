const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');

const PORT = 4002;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

const oAuth2Client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'postmessage',
});

//This Route is used to get the access token
app.post('/auth/google', async (req, res) => {
  try {
    const { code } = req.body;

    const { tokens } = await oAuth2Client.getToken(code);
    console.log(tokens);

    //Set the refresh token as a HTTPOnly cookie
    if (tokens.refresh_token) {
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS (Production)
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/auth/google/refresh-token',
      });
    }

    res.json({
      access_token: tokens.access_token,
      expiry_date: tokens.expiry_date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

//This route is used to refresh the access token from the cookie
app.post('/auth/google/refresh-token', async (req, res) => {
  try {
    //Get the refresh token from the cookie
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token found' });
    }

    //Refresh the access token
    const user = new UserRefreshClient({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    });

    const { credentials } = await user.refreshAccessToken();
    console.log('[Refresh] New credentials:', credentials);

    res.json({
      access_token: credentials.access_token,
      expiry_date: credentials.expiry_date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Token refresh failed' });
  }
});

//This route is used to clear the refresh token cookie on logout
app.post('/auth/logout', (req, res) => {
  res.clearCookie('refresh_token', {
    path: '/auth/google/refresh-token',
  });
  res.status(200).json({ message: 'Refresh token cleared' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
