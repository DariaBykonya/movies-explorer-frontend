import "./Portfolio.css"

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a href="https://github.com/DariaBykonya/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__title-link">Статичный сайт</p>
            <p className="portfolio__icon-link">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/DariaBykonya/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__title-link">Адаптивный сайт</p>
            <p className="portfolio__icon-link">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/DariaBykonya/react-mesto-api-full-gha" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__title-link">Одностраничное приложение</p>
            <p className="portfolio__icon-link">↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio