import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
// import MoreBtn from "./MoreBtn/MoreBtn"
import { useEffect,useState } from "react";
import Preloader from "./Preloader/Preloader";

function MoviesCardList({ movies, savedMovies }) {

  
  const calcVisibleCards = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      return 16;
    } else if (windowWidth >= 1024) {
      return 9
    } else if (windowWidth >= 768) {
      return 8;
    } else if (windowWidth >= 320) {
      return 5;
    } else {
      return 2; // Если ширина экрана меньше 320px, показываем минимальное количество карточек
    }
  };
  const [visibleCards, setVisibleCards] = useState(calcVisibleCards());

  

    // Обновляем количество видимых карточек при изменении размера окна
    useEffect(() => {
        const handleResize = () => {
          const newVisibleCards = calcVisibleCards();
          setVisibleCards(Math.min(newVisibleCards, movies.length)); // Ограничиваем максимальным количеством карточек
        };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [visibleCards]);
  
  return(
    <section>
      <ul className='movies-list'>
        {movies.length === 0 ? (
          <p className='movies-cards__found-nothing-text'>Ничего не найдено</p>
        ) : (
          movies.slice(0, visibleCards).map((movie) => (
            <MoviesCard movie={movie} savedMovies={savedMovies}/>
          ))

)}
      </ul>
    </section>
  )
}

export default MoviesCardList