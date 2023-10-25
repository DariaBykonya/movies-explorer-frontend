import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreBtn from './MoreBtn/MoreBtn';
import { useEffect, useState } from 'react';
import { EMPTY_SEARCH_MESSAGE } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import { MAX_CARDS_LARGE_SCREEN, MAX_CARDS_THREE_SCREEN, MAX_CARDS_MEDIUM_SCREEN, MAX_CARDS_SMALL_SCREEN, CARDS_TO_ADD_LARGE_SCREEN, SCREEN_WIDTH_THREE_CARDS, CARDS_TO_ADD_MEDIUM_SCREEN, CARDS_TO_ADD_SMALL_SCREEN, SCREEN_WIDTH_LARGE, SCREEN_WIDTH_MEDIUM } from '../../utils/constants.js'

function MoviesCardList({ movies = [], savedMovies, isFirstLoad, setLoadingError, setSavedMovies }) {
  const location = useLocation();

  const [visibleCards, setVisibleCards] = useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= SCREEN_WIDTH_LARGE) {
      return MAX_CARDS_LARGE_SCREEN;
    } else if(windowWidth >= SCREEN_WIDTH_THREE_CARDS) {
      return MAX_CARDS_THREE_SCREEN;
    } else if (windowWidth >= SCREEN_WIDTH_MEDIUM) {
      return MAX_CARDS_MEDIUM_SCREEN;
    } else {
      return MAX_CARDS_SMALL_SCREEN;
    }
  });
  const [visibleMoreButton, setVisibleMoreButton] = useState(false);
  const totalCards = movies.length;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (location.pathname === '/saved-movies') {
        setVisibleCards(savedMovies.length);
      } else if (windowWidth >= SCREEN_WIDTH_LARGE) {
        setVisibleCards(MAX_CARDS_LARGE_SCREEN);
      } else if(windowWidth >= SCREEN_WIDTH_THREE_CARDS) {
        setVisibleCards(MAX_CARDS_THREE_SCREEN);
      } else if (windowWidth >= SCREEN_WIDTH_MEDIUM) {
        setVisibleCards(MAX_CARDS_MEDIUM_SCREEN)
      } else {
        setVisibleCards(MAX_CARDS_SMALL_SCREEN);
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
      if(windowWidth >= SCREEN_WIDTH_LARGE) {
        setVisibleCards(visCards => visCards + CARDS_TO_ADD_LARGE_SCREEN)
      } else if(windowWidth >= SCREEN_WIDTH_THREE_CARDS) {
        setVisibleCards(visCards => visCards + CARDS_TO_ADD_MEDIUM_SCREEN)
      } else {
        setVisibleCards(visCards => visCards + CARDS_TO_ADD_SMALL_SCREEN)
      }
  };

  useEffect(()=>{
    const queryFilter = localStorage.getItem('searchText');
  
    if(
        ((queryFilter !== '' || !isFirstLoad ) 
          && movies.length <= 0 
          && (!(location.pathname === '/saved-movies' 
          && savedMovies.length === 0))
        ) || (location.pathname === '/saved-movies' 
            && savedMovies.length === 0 
            && !isFirstLoad)) setLoadingError(EMPTY_SEARCH_MESSAGE)
    else {
      setLoadingError("")
    }
  },[movies]);

  return (
    <section>
      {movies.length > 0 && (
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
      {location.pathname === '/movies' && visibleMoreButton && <MoreBtn onClick={loadMoreCards} />}
    </section>
  );
}

export default MoviesCardList;
