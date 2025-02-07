import React from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function Login() {
  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>OfficeFlow</h1>
          <p className={styles.note}>Reservations made easy.</p>
        </div>
        <button className={styles.loginButton}>
        <FontAwesomeIcon icon={faGoogle}/>
    
        Sign In with Google</button>
      </div>
    </div>
  );
}

export default Login;