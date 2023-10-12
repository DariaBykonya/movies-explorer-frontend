import logo from '../../images/logo.svg';
import "./Logo.css"

function Logo() {
  return (
    <a href="/" className="logo">
      <img
        className="logo__image"
        src={logo}
        alt="Логотип сайта"
      />
    </a>
  );
}
  
  export default Logo