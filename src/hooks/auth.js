import { auth } from '../api/firebase.config';
import { gapi } from 'gapi-script';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const scope = import.meta.env.VITE_SCOPE;

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope(scope);
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  if (token) {
    gapi.client.setToken({
      access_token: token,
    });

    return token;
  }
};

export const signOut = () => {
  return auth.signOut();
};
