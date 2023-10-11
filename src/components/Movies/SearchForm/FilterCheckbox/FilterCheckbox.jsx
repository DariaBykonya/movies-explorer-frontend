import "./FilterCheckbox.css"

function FilterCheckbox() {
  return (
    <div className="filter">
      <label className="filter__switch">
        <input type="checkbox" />
        <span className="filter__slider"></span>
      </label>
      <p className="filter__text">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox