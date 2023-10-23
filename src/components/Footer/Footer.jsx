import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">      
        <p className="footer__year">&copy; 2022</p>
        <div className="footer__links">
          <a href="/" className="footer__link" target="_blank">Яндекс.Практикум</a>
          <a href="https://github.com/DariaBykonya" className="footer__link" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer