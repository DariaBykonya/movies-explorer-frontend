import "./SearchForm.css"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"
import { useState } from "react";

function SearchForm({ onSubmit, searchText, setSearchText, isShortMovies, setIsShortMovies }) {

  // const [searchText, setSearchText] = useState('')
  // const [isShortMovies, setIsShortMovies] = useState(false)
  const [errorInputValid, setErrorInputValid] = useState('')
  

  function handleSubmit(evt) {
    evt.preventDefault();
    // if (!evt.target.checkValidity()) { setError('Нужно ввести ключевое слово'); return; }
    // setError('');
    // onSubmit && onSubmit(inputRef.current.value, isChecked);

    if (searchText === '') {
      setErrorInputValid('Нужно ввести ключевое слово');
      return;
    } else {
      setErrorInputValid('');
    }

    onSubmit(searchText, isShortMovies);
}

  return (
    <>
      <section className="search">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__icon"></div>
          <input
            className="search__input"
            type="text" placeholder="Фильм"
            value={searchText || ''}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button 
            className="search__button"
            type="submit">
              Найти
          </button>
        </form>
        <div className="search__line">&nbsp;</div>
        <FilterCheckbox 
          isChecked={isShortMovies}
          setIsChecked={(value) => setIsShortMovies(value)}
        />
      </section>
      {errorInputValid && <p className="search__error-message">{errorInputValid}</p>}
      <div className="underline-search-form"></div>
    </>
  )
}

export default SearchForm