import { gapi } from 'gapi-script'; //Import the Google API client

const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
const scope = import.meta.env.VITE_SCOPES;

export const initClient = () => {
  gapi.client.init({
    apiKey: apiKey,
    clientId: clientId,
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
    scope: scope,
  });
};
