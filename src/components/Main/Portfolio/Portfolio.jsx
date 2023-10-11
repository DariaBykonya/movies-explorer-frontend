import "./Portfolio.css"

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a href="https://github.com/DariaBykonya/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">Статичный сайт</a>
          <a href="https://github.com/DariaBykonya/how-to-learn" className="portfolio__icon" target="_blank" rel="noreferrer">↗</a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/DariaBykonya/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          <a href="https://github.com/DariaBykonya/russian-travel" className="portfolio__icon" target="_blank" rel="noreferrer">↗</a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/DariaBykonya/react-mesto-api-full-gha" className="portfolio__link" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          <a href="https://github.com/DariaBykonya/react-mesto-api-full-gha" className="portfolio__icon" target="_blank" rel="noreferrer">↗</a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio