import "./MoviesCard.css"
import { useLocation } from "react-router-dom";
import { moviesImgApiUrl } from "../../utils/constants.js"

function MoviesCard({ movie, savedMovies }) {
  const isLiked = () => {
    if (savedMovies.find((savedMovie) => savedMovie.id === movie.id))
      return true;
    return false;
  }

  const formatTime = (minutes) => {
    const min = minutes % 60;
    const hour = Math.floor(minutes / 60);
    return hour ? `${hour}ч ${min}м` : `${min}м`;
  };

  const location = useLocation();

  return (
    <li className='movies-card'>
      <a
      className='movies-card__img-link link'
      href={movie.trailerLink}
      target='_blank'
      rel='noreferrer'
    >
      <img
        className='movies-card__image'
        alt={movie.nameRU}
        src={
          moviesImgApiUrl + (movie.image.url ? movie.image.url : movie.image)
        }
      />
    </a>
    <div className='movies-card__description'>
      <div className='movies-card__description-container'>
        <h3 className='movies-card__title'>{movie.nameRU}</h3>
        {location.pathname === '/saved-movies' ? (
        <button
          className='movies-card__delete-btn button'
        ></button>
      ) : (
        <button
          className={ isLiked() ? 'movies-card__like-btn movies-card__like-btn_active button' : 'movies-card__like-btn button' }
          type='button'
        ></button>
      )}
      </div>
        <p className='movies-card__duration'>{formatTime(movie.duration)}</p>
      
    </div>
    
  </li>
  )
}

export default MoviesCard