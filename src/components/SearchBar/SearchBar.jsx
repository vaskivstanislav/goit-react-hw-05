import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';
import React from 'react';

const SearchBar = React.memo(({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const inputValue = e.target.elements.searchInput.value.trim();
    if (!inputValue) {
      toast.error('Please enter a search term.', {
        style: {
          borderRadius: '8px',
          background: '#ff4d4d',
          color: '#fff',
        },
      });
      return;
    }
    onSearch(inputValue);
    e.target.reset();
  };

  return (
    <header className={styles.searchHeader}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={styles.searchButton} type="submit">
          🔍
        </button>
      </form>
    </header>
  );
});

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;