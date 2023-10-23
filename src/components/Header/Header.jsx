import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import "./Header.css"

function Header() {
  const location = useLocation();

// TODO: Исправить
  const isLogged = false

  return (
    <header
      className={`page-content header ${
        location.pathname === '/' ? 'header_main' : ''
      }`}
    >
    <Logo />

    <Navigation loggedIn={isLogged}/>
      
    </header>
  );
}
  
  export default Header