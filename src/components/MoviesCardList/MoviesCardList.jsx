import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreBtn from './MoreBtn/MoreBtn';
import { useEffect, useState } from 'react';
import { EMPTY_SEARCH_MESSAGE } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movies, savedMovies, isFirstLoad, setLoadingError, setSavedMovies }) {
  const location = useLocation();

  const [visibleCards, setVisibleCards] = useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      return 16;
    } else if (windowWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  });

  const [visibleMoreButton, setVisibleMoreButton] = useState(false);
  const totalCards = movies.length;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (location.pathname === '/saved-movies') {
        setVisibleCards(savedMovies.length);
      } else if (windowWidth >= 1280) {
        setVisibleCards(16);
      } else if (windowWidth >= 768) {
        setVisibleCards(8);
      } else {
        setVisibleCards(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [movies.length]);

  useEffect(() => {
    if (visibleCards >= totalCards) {
      setVisibleMoreButton(false);
    } else {
      setVisibleMoreButton(true);
    }
  }, [visibleCards, totalCards]);

  const loadMoreCards = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      setVisibleCards(visCards => visCards + 4);
    } else if (windowWidth >= 768) {
      setVisibleCards(visCards => visCards + 2);
    } else {
      setVisibleCards(visCards => visCards + 2);
    }
  };
  return (
    <section>
      {isFirstLoad && movies.length > 0 && (
        <ul className="movies-list">
          {movies.slice(0, visibleCards).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
            />
          ))}
        </ul>
      )}
      {!isFirstLoad && movies.length > 0 && (
        <ul className="movies-list">
          {movies.slice(0, visibleCards).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
            />
          ))}
        </ul>
      )}
      {isFirstLoad && location.pathname === '/saved-movies' && movies.length <= 0 && (
        <ul className="movies-list">
          {savedMovies.slice(0, visibleCards).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
            />
          ))}
        </ul>
      )}
      {!isFirstLoad && movies.length <= 0 && setLoadingError(EMPTY_SEARCH_MESSAGE)}
      {location.pathname === '/movies' && visibleMoreButton && <MoreBtn onClick={loadMoreCards} />}
    </section>
  );
}

export default MoviesCardList;
