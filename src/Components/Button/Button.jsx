import React from 'react';
import styles from './Button.module.css';

const gradientStyle = {
  background:
    'linear-gradient(90deg,rgba(60, 128, 246, 1) 0%, rgba(146, 50, 233, 1) 100%)',
  color: 'white',
  border: 'none',
};
const outlineStyle = {
  background: 'transparent',
  color: '#7A7A7F',
  border: '1px solid #D6D6DB',
};

const Button = React.forwardRef(
  ({ type, children, className = '', ...props }, ref) => {
    let buttonStyles;

    switch (type) {
      case 'gradient':
        buttonStyles = gradientStyle;
        break;
      case 'outline':
        buttonStyles = outlineStyle;
        break;
      default:
        buttonStyles = {};
    }

    return (
      <button
        ref={ref}
        className={`${styles.button} ${className}`}
        style={buttonStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
