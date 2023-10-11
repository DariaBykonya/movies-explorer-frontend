import "./AboutProject.css"

function AboutProject() {
  return (
    <div className="aboutProject">
      <h2 className="aboutProject__header">О проекте</h2>
      <div className="aboutProject__line"></div>
      <div className="aboutProject__description">
        <section>
          <h3 className="aboutProject__title">Дипломный проект включал 5 этапов</h3>
          <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </section>
        <section>
          <h3 className="aboutProject__title">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </section>
      </div>

      <section className="aboutProject__time">
        <div className="aboutProject__backend">1 неделя</div>
        <div className="aboutProject__frontend">4 недели</div>
      </section>

      <section className="aboutProject__timeName">
        <p className="aboutProject__pBackend">Back-end</p>
        <p className="aboutProject__pFrontend">Front-end</p>
      </section>


    </div>
  )
}

export default AboutProject