import "./SearchForm.css"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"

function SearchForm() {
  return (
    <>
      <div className="search">
        <div className="search__form">
          <div className="search__icon"></div>
          <input className="search__input" type="text" placeholder="Фильм" required/>
          <button className="search__button" type="submit">Найти</button>
        </div>
        <div className="search__line">&nbsp;</div>
        <FilterCheckbox />
      </div>
      <div className="search__underline"></div>
    </>
  )
}

export default SearchForm