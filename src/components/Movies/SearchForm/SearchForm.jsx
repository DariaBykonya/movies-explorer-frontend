import "./SearchForm.css"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"

function SearchForm() {
  return (
    <>
      <section className="search">
        <div className="search__container">
          <div className="search__icon"></div>
          <input className="search__input" type="text" placeholder="Фильм" required/>
          <button className="search__button" type="submit">Найти</button>
        </div>
        <div className="search__line">&nbsp;</div>
        <FilterCheckbox />
      </section>
      <div className="search__underline"></div>
    </>
  )
}

export default SearchForm