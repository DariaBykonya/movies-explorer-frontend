import './SearchForm.css';
import React, { useState, useEffect } from 'react';
import FilterCheckbox from '../UI/FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({
  search,
  onFilterClick,
  isLoading,
  setIsFirstLoad,
  localStorageFilter,
  setLocalStorageFilter,
  shortFilmFilterOn
}) {
  const formWithValidation = useFormWithValidation();
  const { searchText } = formWithValidation.values;
  const { handleChange, resetForm, setValues } = formWithValidation;
  const [error, setError] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!searchText) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      setIsFirstLoad(false);
      search(searchText);
      if (localStorageFilter) {
        const newLocalStorageFilter = { ...localStorageFilter };
        newLocalStorageFilter.searchText = searchText;
        setLocalStorageFilter(newLocalStorageFilter);
      }
    }
  }

  function onFilterSubmit(evt) {
    if (!searchText) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      setIsFirstLoad(false);
      search(searchText);
      onFilterClick(evt);
    }
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (localStorageFilter) {
      setValues({ searchText: localStorageFilter.searchText });
    }
  }, [setValues, localStorageFilter]);

  return (
    <>
      <section className="search">
        <form className="search__form" noValidate onSubmit={handleSubmit}>
          <div className="search__icon"></div>
          <input
            className="search__input"
            type="text"
            name="searchText"
            placeholder="Фильм"
            value={searchText || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
          <button className="search__button" type="submit">
            Найти
          </button>
        </form>
        <div className="search__line">&nbsp;</div>
        <FilterCheckbox onFilterClick={onFilterSubmit} value={shortFilmFilterOn} />
      </section>
      {error && <span className="search-form__error">{error}</span>}

      <div className="underline-search-form"></div>
    </>
  );
}

export default SearchForm;
