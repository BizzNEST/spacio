import React from 'react';
import styles from './Button.module.css';

function Button({ type = "outline", children, ...props}) {
  let buttonStyles = `${styles.baseButton}`;

    switch (type) {
        case "gradient":
          buttonStyles = `${buttonStyles} ${styles.gradientButton}`;
          break;
        case "outline":
        default:
          buttonStyles = `${buttonStyles} ${styles.outlineButton}`;
      }    
      return (
        <button className={buttonStyles} {...props}>
          {children}
        </button>

          );
    };
  
export default Button;