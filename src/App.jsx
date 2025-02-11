import { useEffect, useState, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import { fetchArticles } from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageData, setImageData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const getData = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const data = await fetchArticles(page, searchQuery);

        if (data.total_pages === 0) {
          toast.error('No results found. Please try a different query.', {
            style: {
              borderRadius: '8px',
              background: '#ff4d4d',
              color: '#fff',
            },
          });
          return;
        }

        setImageData((prev) => [...prev, ...data.results]);
        setMaxPage(data.total_pages);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [page, searchQuery]);

  const handleSearchSubmit = useCallback((query) => {
    setSearchQuery(query);
    setImageData([]);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handleOpenModal = useCallback((image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  return (
    <>
      <SearchBar onSearch={handleSearchSubmit} />
      {isLoading && <Loader />}
      {hasError && (
        <ErrorMessage message="Failed to load data. Please try again later." />
      )}
      {imageData.length > 0 && (
        <>
          <ImageGallery images={imageData} onOpenModal={handleOpenModal} />
          {maxPage > page && <LoadMoreBtn onLoadMore={handleLoadMore} />}
        </>
      )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageData={selectedImage}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;

//