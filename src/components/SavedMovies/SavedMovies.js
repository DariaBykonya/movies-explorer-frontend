import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { SHORT_MOVIE, ERROR_LOAD_MESSAGE } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

function SavedMovies({
  savedMovies,
  isLoader,
  loadingError,
  setLoadingError,
  setSavedMovies,
  isFirstLoad,
  setIsFirstLoad,
  setIsLoader,
  searchFilter
}) {
  const [filterIsOn, setFilterIsOn] = useState(false);
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const filterShortFilm = moviesToFilter =>
    moviesToFilter.filter(item => item.duration < SHORT_MOVIE);

  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);

  };
  const searchSavedMovies = searchText => {
    setIsLoader(true);

    setFilterSavedMovies(searchFilter(savedMovies, searchText));

    setIsLoader(false);

  };

  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then(data => {
        const savedArray = data.movies.map(item => ({ ...item, id: item.movieId }));
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
        setFilterSavedMovies(savedArray);
      })
      .catch(() => {
        localStorage.removeItem('savedMovies');
        setLoadingError(ERROR_LOAD_MESSAGE);
      });
  };

  useEffect(()=>{
    const allSavedMoviesLocalJSON = localStorage.getItem('savedMovies');
    if(allSavedMoviesLocalJSON){
      const allSavedMoviesLocal = JSON.parse(allSavedMoviesLocalJSON);
      if (allSavedMoviesLocal) {
        setSavedMovies(allSavedMoviesLocal);
        setFilterSavedMovies(allSavedMoviesLocal);
      } else {
        getSavedMovies();
      }
    }
    },[])

    useEffect(()=>{
        const s = new Set(savedMovies.map((e)=>e._id));
        if (filterSavedMovies.length === 0) setFilterSavedMovies(savedMovies)
        else {
          const newSet = filterSavedMovies.filter((e)=>s.has(e._id))
          if (newSet.length !== 0) setFilterSavedMovies(filterSavedMovies.filter((e)=>s.has(e._id)))
          else {setFilterSavedMovies([])}
        }

    },[savedMovies])
  
  return (
    <>
      <Header />
      <main className="movie">
        <SearchForm
          onFilterClick={onFilterClick}
          search={searchSavedMovies}
          setIsFirstLoad={setIsFirstLoad}
          shortFilmFilterOn={filterIsOn}
        />
        {isLoader && <Preloader />}
        <MoviesCardList
          savedMovies={savedMovies}
          setLoadingError={setLoadingError}
          movies={filterIsOn ? filterShortFilm(filterSavedMovies): filterSavedMovies}
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
