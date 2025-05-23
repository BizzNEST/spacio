import React from 'react';
import styles from './StatusTag.module.css';

const colorStyles = {
  success: { backgroundColor: '#7effbab7', color: '#2e5e45' }, //green
  notice: {backgroundColor:'#FFDF92', color:'#836303' }, //yellow
  warning: { backgroundColor: '#FFB5B5', color: '#8A0202' }, //red
  tagLight: { backgroundColor: '#ffffff58', color: '#ffffff' }, 
  tagDark: { backgroundColor: '#4a4a4a5d', color: '#ffffff' },
};

const StatusTag = ({  color = 'tagLight', tagFormat, children }) => {
  const isValid = ['success', 'warning', 'notice', 'tagDark', 'tagLight'].includes(color);
  if (!isValid) {
    throw new Error(
      'Only accepted values are: success, warning, notice, tagLight, tagDark'
    );
  }
  const tagStyles = colorStyles[color];
  const tagClassName = `${styles.tag} ${tagFormat}`;
  return (
    <div className={tagClassName} style={tagStyles}>
      {children}
    </div>
  );
};

export default StatusTag;
