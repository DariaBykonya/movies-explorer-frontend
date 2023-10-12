import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreBtn from "../MoviesCardList/MoreBtn/MoreBtn";
import Footer from "../Footer/Footer";
// TODO: брать данные из API
import { movies, savedMovies } from "../../utils/constants.js"

function Movies() {
  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <MoviesCardList movies={movies} savedMovies={savedMovies}/>
        <MoreBtn />
      </main>
      <Footer />
    </>
  );
}
  
  export default Movies