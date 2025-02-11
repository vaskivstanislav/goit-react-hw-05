import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.css';
import React from 'react';

const ErrorMessage = React.memo(
  ({ message = 'An unexpected error occurred. Please try again later.' }) => {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{message}</p>
      </div>
    );
  }
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;