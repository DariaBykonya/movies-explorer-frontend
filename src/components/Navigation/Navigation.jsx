import { Link, NavLink, useLocation } from "react-router-dom";
import account from "../../images/icon__account.svg";
import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState, useContext } from "react";
import { SignContext } from "../../contexts/SignContext";

function Navigation() {
    const logContext = useContext(SignContext);
    const { loggedIn } = logContext;
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    function toggleBurgerMenu() {
        setIsOpen(!isOpen);

        if (!isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "auto";
        }
    }

  return (
    <>
      {loggedIn ? (
        <>
          <div className="navigation">
            <nav className="navigation__links">
              <NavLink className="navigation__link-title" to="/movies">
                Фильмы
              </NavLink>
              <NavLink className="navigation__link-title" to="/saved-movies">
                Сохранённые фильмы
              </NavLink>
            </nav>
          </div>
          <a href="/profile" className="account">
            <p className="account__title">Аккаунт</p>
            <div
              className={`account__icon-background ${
                location.pathname === "/" ? "account__icon-background-home" : ""
              }`}
            >
              <img
                className="account__icon"
                src={account}
                alt="картинка аккаунта"
              />
            </div>
          </a>
          <button
            className="burger-btn"
            onClick={toggleBurgerMenu}
            type="button"
          ></button>
        </>
      ) : (
        <>
          <div className="navigation__auth-link">
            <Link className="navigation__signup" to="/signup">
              Регистрация
            </Link>
            <Link className="navigation__signin" to="/signin">
              Войти
            </Link>
          </div>
        </>
      )}

      <BurgerMenu isOpen={isOpen} onClose={toggleBurgerMenu} />
    </>
  );
}

export default Navigation;
