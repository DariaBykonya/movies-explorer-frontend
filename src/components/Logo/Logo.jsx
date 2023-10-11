import logo from '../../images/logo.svg';
import "./Logo.css"

function Logo() {
  return (
    <a href="/" className="header__link">
      <img
        className="logo header__logo"
        src={logo}
        alt="Логотип сайта"
      />
    </a>
  );
}
  
  export default Logo