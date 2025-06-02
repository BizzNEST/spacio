import React from 'react';
import styles from './Button.module.css';

const Button = React.forwardRef(
  (
    {
      variant = 'outline',
      children,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
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
