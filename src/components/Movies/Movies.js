import './Movies.css';
import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { SHORT_MOVIE } from '../../utils/constants';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({
  savedMovies,
  searchMovies,
  movies,
  isLoader,
  loadingError,
  setLoadingError,
  setSavedMovies,
  isFirstLoad,
  setIsFirstLoad
}) {
  const [localStorageFilter, setLocalStorageFilter] = useState({});
  const filterShortFilm = moviesToFilter => {
    return moviesToFilter.filter(item => item.duration < SHORT_MOVIE);
  };

  const onFilterClick = () => {
    const newLocalStorageFilter = { ...localStorageFilter };
    newLocalStorageFilter.filterIsOn = !newLocalStorageFilter.filterIsOn;
    setLocalStorageFilter(newLocalStorageFilter);
    localStorage.setItem('shortFilmFilter', newLocalStorageFilter.filterIsOn);
  };

  useEffect(() => {
    setLoadingError('');
    const queryFilter = localStorage.getItem('searchText');
    const shortFilmFilter = localStorage.getItem('shortFilmFilter');
    const storageFilter = {};
    if (queryFilter) {
      storageFilter.searchText = queryFilter;
    }
    if (shortFilmFilter) {
      storageFilter.filterIsOn = shortFilmFilter === 'true' ? true : false;
    }
    setLocalStorageFilter(storageFilter);
  }, []);

  function handleUpdateLocalStorageFilter(storageFilter) {
    setLocalStorageFilter(storageFilter);
    if (storageFilter.searchText) localStorage.setItem('searchText', storageFilter.searchText);
    if (storageFilter.shortFilmFilter)
      localStorage.setItem('shortFilmFilter', storageFilter.shortFilmFilter);
  }

  return (
    <>
      <Header />
      <main className="movie">
        <SearchForm
          onFilterClick={onFilterClick}
          search={searchMovies}
          setIsFirstLoad={setIsFirstLoad}
          localStorageFilter={localStorageFilter}
          setLocalStorageFilter={handleUpdateLocalStorageFilter}
          shortFilmFilterOn={localStorageFilter.filterIsOn}
        />
        {isLoader && <Preloader />}

        {!isLoader && (
          <MoviesCardList
            savedMovies={savedMovies}
            setLoadingError={setLoadingError}
            movies={localStorageFilter.filterIsOn ? filterShortFilm(movies) : movies}
            setSavedMovies={setSavedMovies}
            isFirstLoad={isFirstLoad}
          />
        )}

        {!isLoader && <div className="movies__text-error">{loadingError}</div>}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
