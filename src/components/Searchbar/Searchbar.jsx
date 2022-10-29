import React from 'react';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { IconContext } from 'react-icons';

import css from '../Searchbar/Searchbar.module.css';

export const Searchbar = ({ onChangeSearchQuery }) => {
  const [searchquery, setSearchquery] = useState('');

  const onChangeInput = e => {
    setSearchquery(e.currentTarget.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    onChangeSearchQuery(searchquery);
    setSearchquery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.spanSearch}>
            <IconContext.Provider
              value={{
                size: 30,
                display: 'flex',
                aliginItem: 'center',
              }}
            >
              <HiSearch width="30" height="30"></HiSearch>
            </IconContext.Provider>
          </span>
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          value={searchquery}
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};
