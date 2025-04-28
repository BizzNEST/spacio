import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import styles from './ButtonGroup.module.css';

const ButtonGroup = ({ children, type, className, ...props }) => {
  const buttonGroupStyles = `${styles.toggleGroup} ${className}`;

  return (
    <ToggleGroup.Root {...props} className={buttonGroupStyles} type={type}>
      {children}
    </ToggleGroup.Root>
  );
};

const ButtonGroupItem = ({ children, value, asChild, className, ...props }) => {
  const ButtonGroupItemStyles = `${styles.toggleGroupItem} ${className}`;

  return (
    <ToggleGroup.Item
      {...props}
      className={ButtonGroupItemStyles}
      value={value}
      asChild={asChild}
    >
      {children}
    </ToggleGroup.Item>
  );
};

ButtonGroup.Item = ButtonGroupItem;
export default ButtonGroup;
