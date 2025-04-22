import React from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../hooks/auth';
import { useAuth } from '../contexts/authContext';

function Login() {
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const { isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithGoogle().catch((error) => {
        console.error('Error signing in: ', error);
        setIsSigningIn(false);
      });
    }
  };

  React.useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/home');
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>OfficeFlow</h1>
          <p className={styles.note}>Reservations made easy.</p>
        </div>

        <button onClick={handleSignIn} className={styles.loginButton}>
          <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
