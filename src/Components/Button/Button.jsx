import React from 'react';
import styles from './Button.module.css';

const VALID_VARIANTS = ['outline', 'gradient', 'danger'];

const Button = React.forwardRef(
  ({ variant, children, className = '', type = 'button', ...props }, ref) => {
    const isValid = VALID_VARIANTS.includes(variant);
    if (!isValid) {
      throw new Error(
        "Only accepted values are: 'outline', 'gradient', 'danger'"
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={`${styles.button} ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
