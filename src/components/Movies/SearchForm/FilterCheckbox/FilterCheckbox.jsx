import "./FilterCheckbox.css"

function FilterCheckbox() {
  return (
    <section className="filter">
      <label className="filter__switch">
        <input type="checkbox" />
        <span className="filter__slider"></span>
      </label>
      <p className="filter__text">Короткометражки</p>
    </section>
  )
}

export default FilterCheckbox