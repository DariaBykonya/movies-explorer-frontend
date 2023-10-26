import React from "react";
import "./AboutMe.css";
import Photo from "../../images/my-photo.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me">
      <h1 className="about-me__title">Студент</h1>
      <div className="about-me__wrapper">
        <div className="about-me__information">
          <div className="about-me__information-container">
            <h2 className="about-me__name">Дарья</h2>
            <p className="about-me__subtitle">Фронтенд-разработчик, 22 года</p>
            <p className="about-me__bio">
            Я&nbsp;родилась в&nbsp;Москве, закончила дефектологический факультет МПГУ. Я&nbsp;люблю слушать музыку, играть в&nbsp;волейбол, а&nbsp;ещё увлекаюсь йогой. Недавно начала кодить. С&nbsp;2022 года работала учителем-дефектологом в&nbsp;школе для слабослышащих. После того, как пройду курс по&nbsp;веб-разработке, начну искать работу по&nbsp;этой специальности.
            </p>
          </div>
          <div className="about-me__links-container">
            <a
              href="https://github.com/DariaBykonya"
              className="about-me__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <img src={Photo} alt="Мое фото" className="about-me__photo" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
