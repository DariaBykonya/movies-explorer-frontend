import "./AboutMe.css"
import myPhoto from "../../../images/my-photo.jpg"
import Portfolio from "../Portfolio/Portfolio"

function AboutMe() {
  return (
      <div className="student">
        <h2 className="student__header">Студент</h2>
        <div className="student__line"></div>
        <div className="student__info">
          <div className="student__description">
            <h3 className="student__name">Дарья</h3>
            <p className="student__employment">Фронтенд-разработчик, 22 года</p>
            <p className="student__about">Я&nbsp;родилась в&nbsp;Москве, закончила дефектологический факультет МПГУ. Я&nbsp;люблю слушать музыку, играть в&nbsp;волейбол, а&nbsp;ещё увлекаюсь йогой. Недавно начала кодить. С&nbsp;2022 года работала учителем-дефектологом в&nbsp;школе для слабослышащих. После того, как пройду курс по&nbsp;веб-разработке, начну искать работу по&nbsp;этой специальности.</p>
            <a href="https://github.com/DariaBykonya" className="student__github" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="student__photo" src={myPhoto} alt="фотография студента" />
        </div>
        <Portfolio />
      </div>
  )
}

export default AboutMe