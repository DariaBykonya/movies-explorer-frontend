import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { SHORT_MOVIE } from '../../utils/constants';

function SavedMovies({
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
  const [filterIsOn, setFilterIsOn] = useState(false);
  const filterShortFilm = moviesToFilter =>
    moviesToFilter.filter(item => item.duration < SHORT_MOVIE);

  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };
  setLoadingError('');
  return (
    <>
      <Header />
      <main className="movie">
        <SearchForm
          onFilterClick={onFilterClick}
          search={searchMovies}
          setIsFirstLoad={setIsFirstLoad}
        />
        {isLoader && <Preloader />}

        <MoviesCardList
          savedMovies={savedMovies}
          setLoadingError={setLoadingError}
          movies={filterIsOn ? filterShortFilm(movies) : movies}
          setSavedMovies={setSavedMovies}
          isFirstLoad={isFirstLoad}
        />

        {!isLoader && loadingError !== '' && (
          <div className="movies__text-error">{loadingError}</div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
