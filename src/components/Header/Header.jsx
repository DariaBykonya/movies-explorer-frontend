import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import "./Header.css"

function Header() {
  const location = useLocation();

// TODO: Исправить
  const isLogged = true

  return (
    <header
      className={`page-content header ${
        location.pathname === '/' ? 'header__main' : ''
      }`}
    >
    <Logo />

    <Navigation loggedIn={isLogged}/>
      
    </header>
  );
}
  
  export default Header