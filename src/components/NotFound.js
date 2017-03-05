import React from 'react';
import { Link } from 'react-router';

import styles from '../assets/scss/notfound.scss';

const NotFound = () => (
  <div className={styles.notFound}>
    <h1>Not Found</h1>
    <p><Link to="/">Home</Link></p>
  </div>
);

export default NotFound;
