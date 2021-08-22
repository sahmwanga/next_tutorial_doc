import React from 'react';
import styles from './Button.module.css';

function Button() {
  return (
    <input type="button" className={styles.error}>
      Danger
    </input>
  );
}

export default Button;
