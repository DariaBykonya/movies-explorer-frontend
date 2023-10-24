import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

function MoviesCard({ movie, savedMovies, setSavedMovies }) {
  const setLike = () => {
    if(savedMovies.find((item)=>item._id === movie._id) !== undefined) {
        return;
    }
    mainApi
      .postMovie(movie)
      .then(res => {
        setSavedMovies([res.movie, ...savedMovies]);
      })
      .catch(err => console.log(err));

  };

  const deleteLike = () => {
    const savedMovie = savedMovies.find(m => m.movieId === movie.id || m.movieId === movie.movieId);
    if (!savedMovie) return;
    setSavedMovies(savedMovies.filter(m => m._id !== savedMovie._id));
    mainApi.deleteMovie(savedMovie._id);

  };

  const isLiked = () => {
    if (savedMovies.find(savedMovie => savedMovie.movieId === movie.id)) return true;
    return false;
  };

  const formatTime = minutes => {
    const min = minutes % 60;
    const hour = Math.floor(minutes / 60);
    return hour ? `${hour}ч ${min}м` : `${min}м`;
  };

  const location = useLocation();

  return (
    <li className="movies-card">
      <a
        className="movies-card__img-link link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          alt={movie.nameRU}
          src={movie.image.url ? movie.image.url : movie.image}
        />
      </a>
      <div className="movies-card__description">
        <div className="movies-card__description-container">
          <h3 className="movies-card__title">{movie.nameRU}</h3>
          {location.pathname === '/saved-movies' ? (
            <button className="movies-card__delete-btn button" onClick={deleteLike}></button>
          ) : (
            <button
              className={
                isLiked()
                  ? 'movies-card__like-btn movies-card__like-btn_active button'
                  : 'movies-card__like-btn button'
              }
              type="button"
              onClick={isLiked() ? deleteLike : setLike}
            ></button>
          )}
        </div>
        <p className="movies-card__duration">{formatTime(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
