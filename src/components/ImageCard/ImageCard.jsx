import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';
import React from 'react';

const ImageCard = React.memo(({ imageData, onOpenModal }) => {
  if (!imageData) return null;

  const { urls, description = 'No description available', likes = 0 } = imageData;

  const handleClick = () => {
    onOpenModal({ url: urls.full, name: description });
  };

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          onClick={handleClick}
          src={urls.small}
          alt={description}
          loading="lazy"
        />
      </div>
      <div className={styles.likesContainer}>
        <p className={styles.likesText}>❤️ {likes}</p>
      </div>
    </li>
  );
});

ImageCard.propTypes = {
  imageData: PropTypes.shape({
    urls: PropTypes.shape({
      full: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageCard;