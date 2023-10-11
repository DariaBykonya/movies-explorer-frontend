import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
// TODO: брать данные из API
import { movies, savedMovies } from "../../utils/constants.js"



function SavedMovies() {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList movies={movies} savedMovies={savedMovies}/>
      <Footer />
    </>
  );
}
  
  export default SavedMovies