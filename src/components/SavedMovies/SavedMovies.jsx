import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
// TODO: брать данные из API
import { savedMovies } from "../../utils/constants.js"



function SavedMovies({ movies }) {
  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <MoviesCardList movies={movies} savedMovies={savedMovies}/>
      </main>
      <Footer />
    </>
  );
}
  
  export default SavedMovies