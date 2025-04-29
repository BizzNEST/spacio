import React from 'react';
import styles from './Button.module.css';

const gradientStyle = {
  background: "linear-gradient(90deg, #4764E8 0%, #7A91F4 100%)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "flex",
  gap: "8px",
  position: "static", 


}
const outlineStyle = {
  background: "transparent",
  color: "#3b82f6",
  border: "1px solid #3b82f6",
}


function Button({ type = "outline", children, ...props}) {
  let buttonStyles;


    switch (type) {                     
        case "gradient":
          buttonStyles = gradientStyle;
          break;  
        case "outline":
          buttonStyles = outlineStyle;
          break;
        default:
          buttonStyles = outlineStyle;
      }     
      return (
        <button className={styles.baseButton} style={buttonStyles} {...props}>
        {children}
      </button>

          );
    };
  
export default Button;