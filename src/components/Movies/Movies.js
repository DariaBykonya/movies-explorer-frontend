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
  }, [setLoadingError]);

  function handleUpdateLocalStorageFilter(storageFilter) {
    setLocalStorageFilter(storageFilter);
    if (storageFilter.searchText !== undefined) localStorage.setItem('searchText', storageFilter.searchText);
    if (storageFilter.filterIsOn !== undefined)
      localStorage.setItem('shortFilmFilter', storageFilter.filterIsOn);
  }

  return (
    <>
      <Header />
      <main className="movie">
        <SearchForm
          search={searchMovies}
          setIsFirstLoad={setIsFirstLoad}
          localStorageFilter={localStorageFilter}
          setLocalStorageFilter={handleUpdateLocalStorageFilter}
          shortFilmFilterOn={localStorageFilter.filterIsOn}
          onFilterClick={()=>{}}
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
