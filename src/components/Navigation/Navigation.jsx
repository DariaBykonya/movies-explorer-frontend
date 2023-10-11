import { Link, NavLink, useLocation } from 'react-router-dom';
import account from '../../images/icon__account.svg'
import "./Navigation.css"
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';

function Navigation({ loggedIn }) {

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false)

  function toggleBurgerMenu () {
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <>
      {loggedIn ? (
        <>
          <div className='navigation'>
            <nav className="navigation__links">
              <NavLink className="navigation__link-title" to="/movies">
                Фильмы
              </NavLink>
              <NavLink className="navigation__link-title" to="/saved-movies">
                Сохранённые фильмы
              </NavLink>
            </nav>
          </div>
          <div className='navigation__account'>
          <a href="/profile" className='navigation__account'>
            <p className='navigation__account-title'>Аккаунт</p>
            <div className={`navigation__icon-background ${location.pathname === '/' ? 'navigation__icon-background-home' : ''}`}>
              <img
              className='navigation__account-icon'
              src={account}
              alt='картинка аккаунта'
              />
            </div>
          </a>
        </div>
        <button className="navigation__menu" onClick={toggleBurgerMenu} type="button"></button>
      </>
      ) : 
      (
      <>
        <div className='navigation__auth-link'>
        <Link className="navigation__signup" to="/signup">
          Регистрация
        </Link>
        <Link className="navigation__signin" to="/signin">
        Войти
        </Link>
      </div>
    </>
    )}
    
    <BurgerMenu isOpen={isOpen} onClose={toggleBurgerMenu}/>

  </>

  
  );
}
  
  export default Navigation