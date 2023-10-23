import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox({ onFilterClick, value }) {
  return (
    <section className="filter">
      <label className="filter__switch">
        <input type="checkbox" checked={value} onChange={onFilterClick} />
        <span className="filter__slider"></span>
      </label>
      <p className="filter__text">Короткометражки</p>
    </section>
  );
}

export default FilterCheckbox;
