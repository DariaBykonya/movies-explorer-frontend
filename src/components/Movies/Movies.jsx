import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import "./Movies.css"
// TODO: брать данные из API
import { savedMovies } from "../../utils/constants.js"
import { useEffect, useState } from "react";

function Movies( { movies, isLoading } ) {
  const [moviesFiltred, setMoviesFiltred] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('')
  const [isShortMovies, setIsShortMovies] = useState(false);

  function saveSearchDataToLocalStorage(searchText, isShortMovies, movies) {
    const searchData = {
      searchText,
      isShortMovies,
      movies,
    };
  
      localStorage.setItem('searchData', JSON.stringify(searchData))
    
    console.log("GETLOCAL", JSON.parse(localStorage.getItem('searchData')));
  }

  
  function filterMovies(searchText, isShortMovies) {

    setIsFirstLoad(false);
    setError(null);

    try{
      const filteredMovies = movies.filter(movie =>
        ((isShortMovies && movie.duration < 41) || !isShortMovies)
        && movie.nameRU.toLowerCase().includes(searchText.toLowerCase()));
      setMoviesFiltred(filteredMovies)
      saveSearchDataToLocalStorage(searchText, isShortMovies, filteredMovies);
      console.log("filerMovie", moviesFiltred)
    } catch(err) {
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        console.error(`Ошибка при получении фильмов: ${err}`);
    }
  }

useEffect(() => {
  const searchData = localStorage.getItem('searchData');
  if (searchData) {
    setIsFirstLoad(false);
    const parsedSearchData = JSON.parse(searchData);
    const { searchText, isShortMovies, movies } = parsedSearchData;
    console.log("TEXT", searchText)
    console.log("SHORT", isShortMovies)
    console.log("MOVIES LOCAL STORAGE", movies)
    setSearchText(searchText);
    setIsShortMovies(isShortMovies);
    setMoviesFiltred(movies);
  }
}, []);



  return (
    <>
      <Header />
      <main className="movie">
        <SearchForm 
          onSubmit={filterMovies}
          searchText={searchText}
          setSearchText={setSearchText}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
        />
        {error ? (
          <p className="movie__text-error">{error}</p>
        ) : (
          <MoviesCardList
            movies={moviesFiltred}
            savedMovies={savedMovies}
            isLoading={isLoading}
            isFirstLoad={isFirstLoad}
           />
        )}
      </main>
      <Footer />
    </>
  );
}
  
  export default Movies