import { auth } from '../api/firebase.config';
import { gapi } from 'gapi-script';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const scope = import.meta.env.VITE_SCOPE;

export const signInWithGoogle = async () => {
  const existingUser = auth.currentUser;
  const gapiSignedIn = gapi?.auth2?.getAuthInstance()?.isSignedIn.get();

  if (existingUser && gapiSignedIn) {
    return gapi.client.getToken();
  }

  const provider = new GoogleAuthProvider();
  provider.addScope(scope);
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  if (token) {
    //Automatically sign out after 1 hour
    const expiresIn = 3600 * 1000;
    localStorage.setItem('google_access_token', token);
    gapi.client.setToken({
      access_token: token,
    });

    setTimeout(() => {
      signOut();
    }, expiresIn);

    return token;
  }
};

export const signOut = () => {
  localStorage.removeItem('google_access_token');
  return auth.signOut();
};
