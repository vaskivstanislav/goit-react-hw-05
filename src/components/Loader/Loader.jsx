import PropTypes from 'prop-types';
import { MutatingDots } from 'react-loader-spinner';
import styles from './Loader.module.css';
import React from 'react';

const Loader = React.memo(({ size = 100, color = '#3498db' }) => {
  return (
    <div className={styles.loaderContainer} aria-label="Loading...">
      <MutatingDots
        height={size}
        width={size}
        color={color}
        secondaryColor={color}
        radius={size / 8}
        ariaLabel="loading"
      />
    </div>
  );
});

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Loader;