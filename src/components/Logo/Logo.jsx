import logo from '../../images/logo.svg';
import "./Logo.css"

function Logo() {
  return (
    <a href="/" className="logo__link">
      <img
        className="logo logo__image"
        src={logo}
        alt="Логотип сайта"
      />
    </a>
  );
}
  
  export default Logo