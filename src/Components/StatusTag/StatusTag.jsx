import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './StatusTag.module.css';

const colorStyles = {
  success: { backgroundColor: '#7effbab7', color: '#2e5e45' },
  warning: { backgroundColor: '#ffde92c4', color: '#836303' },
  tagLight: { backgroundColor: '#ffffff58', color: '#ffffff' },
  tagDark: { backgroundColor: '#4a4a4a5d', color: '#ffffff' },
};

const StatusTag = ({ label, color = 'tagLight', children }) => {
  const isValid = ['success', 'warning', 'tagDark', 'tagLight'].includes(color);
  if (!isValid) {
    throw new Error(
      'Only accepted values are: success, warning, tagLight, tagDark'
    );
  }
  const tagStyles = colorStyles[color];

  return (
    <div className={styles.tag} style={tagStyles}>
      {children}
    </div>
  );
};

export default StatusTag;
