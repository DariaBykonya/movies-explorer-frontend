import Header from "../Header/Header";
import "./Profile.css"
import { useState } from "react";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const edit = () => {
    setIsEdit(true);
  }
  const saveProfile = () => {
    setIsEdit(false);
  }
  return (
    <>
      <Header />
      <form className="profile" name='profile'>
        <h2 className="profile__title">Привет, Дарья!</h2>
        <fieldset className="profile__inputs">
          <label className="profile__input-label" for="name">Имя
          <input
          type="text"
          className="profile__input"
          placeholder="имя"
          name="name"
          disabled={!isEdit}
          id="name"
          required
          pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*"
          />
          </label>
          <label className="profile__input-label" for="email">E-mail
            <input
            type="email"
            className="profile__input"
            placeholder="почта"
            name="email"
            id="email"
            disabled={!isEdit}
            required pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
            />
          </label>
        </fieldset>
        <fieldset className="profile__buttons">
          { !isEdit ? <>
          <span className="profile__validation"></span>
          <button
            type="button"
            className="profile__button isSubmitDisabled"
            onClick={edit}
          >
            Редактировать
          </button>
          <button
            type="button"
            className="profile__button profile__button_logout profile__button_attention"
          >
            Выйти из аккаунта
          </button>
        </> : <>
        <span className="profile__validation"></span>
        <button
            type="button"
            className="profile__btn-edit profile__button_attention"
            onClick={saveProfile}
          >
            Сохранить
          </button></>
        }
        </fieldset>
      </form>
  </>
  );
}
  
  export default Profile