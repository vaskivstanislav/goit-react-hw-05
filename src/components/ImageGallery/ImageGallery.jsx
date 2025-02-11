import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import React from 'react';

const ImageGallery = React.memo(({ images, onOpenModal }) => {
  if (!images || images.length === 0) {
    return <p className={styles.noImagesText}>No images found.</p>;
  }

  return (
    <ul className={styles.gallery}>
      {images.map((item) => (
        <ImageCard key={item.id} imageData={item} onOpenModal={onOpenModal} />
      ))}
    </ul>
  );
});

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;