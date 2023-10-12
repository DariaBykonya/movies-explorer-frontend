import "./SearchForm.css"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"

function SearchForm() {
  return (
    <>
      <section className="search">
        <form className="search__form">
          <div className="search__icon"></div>
          <input className="search__input" type="text" placeholder="Фильм" required/>
          <button className="search__button" type="submit">Найти</button>
        </form>
        <div className="search__line">&nbsp;</div>
        <FilterCheckbox />
      </section>
      <div className="underline-search-form"></div>
    </>
  )
}

export default SearchForm