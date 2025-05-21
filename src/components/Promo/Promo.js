import "./Promo.css";
import PromoLogo from "../../images/main-image.svg";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки<br />
        "Поиск фильмов"
      </h1>
      <img src={PromoLogo} alt="Промо логотип" className="promo__logo" />
    </section>
  );
}

export default Promo;
