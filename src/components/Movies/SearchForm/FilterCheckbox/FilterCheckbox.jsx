import "./FilterCheckbox.css"

function FilterCheckbox({ isChecked, setIsChecked }) {

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <section className="filter">
      <label className="filter__switch">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
        <span className="filter__slider"></span>
      </label>
      <p className="filter__text">Короткометражки</p>
    </section>
  )
}

export default FilterCheckbox