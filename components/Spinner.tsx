import React from 'react';
import styles from '../styles/spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.filmstrip} />
        <p className={styles.text}>
          loading
        </p>
      </div>
    </div>
  )
}

export default Spinner;