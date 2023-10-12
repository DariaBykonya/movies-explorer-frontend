import { NavLink } from "react-router-dom"
import "./BurgerMenu.css"

function BurgerMenu ({ isOpen, onClose }) {

  function makeLinkActive({isActive}) {
    return isActive ? 'burger__link burger__link_active' : 'burger__link';
  }

  function makeProfileLinkActive({isActive}) {
    return isActive ? 'burger__link burger__link_active burger__account' : 'burger__link burger__account';
  }

  return (
    isOpen && 
      <nav className="burger">
        <ul className="burger__links">
            <li className=""><NavLink onClick={onClose} className={makeLinkActive} to="/">Главная</NavLink></li>
            <li className=""><NavLink onClick={onClose} className={makeLinkActive} to="/movies">Фильмы</NavLink></li>
            <li className=""><NavLink onClick={onClose} className={makeLinkActive} to="/saved-movies">Сохранённые фильмы</NavLink></li>
            <li className="burger__item_profile"><NavLink onClick={onClose} className={makeProfileLinkActive} to="/profile">Аккаунт
              </NavLink>
            </li>
            <button className="burger__close" onClick={onClose}></button>
        </ul>
      </nav>
  )
} 

export default BurgerMenu