import "./Profile.css";
import Header from '../Header/Header';
import React, { useState, useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {
  MESSAGE_UPDATE_PROFILE_OK,
  MESSAGE_UPDATE_PROFILE_FALE,
} from "../../utils/constants";

function Profile({
  currentUser,
  onSignOut,
  onUpdateUser,
  editIsSuccess,
  editIsFailed,
}) {
  const { values, setValues, handleChange, errors, isValid, setIsValid } =
    useFormWithValidation();
    useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // При каждом изменении значений инпутов, проверяем, есть ли изменения
    const inputChanged =
      values.name !== currentUser.name || values.email !== currentUser.email;
    setHasChanges(inputChanged);
  }, [values, currentUser]);

  const edit = () => {
    setIsEdit(true);
  }

  const saveProfile = () => {
    setIsEdit(false);
  }

  return (
    <>
      <Header />
      <main className="profile">
        <h2 className="profile__title">Hello, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__form-label" htmlFor="name">
            Name
            <input
              className="profile__form-input"
              id="name"
              required
              minLength="2"
              maxLength="30"
              name="name"
              type="text"
              placeholder="Name"
              pattern={"^[\\-A-Za-zА-Яа-я\\s]*$"}
              value={values.name || ""}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </label>
          <span className="profile__form-error">{errors.name}</span>
          <label className="profile__form-label" htmlFor="email">
            E-mail
            <input
              className="profile__form-input"
              id="email"
              required
              name="email"
              type="email"
              placeholder="Почта"
              value={values.email || ""}
              onChange={handleChange}
              autoComplete="off"
              disabled={!isEdit}
              pattern={"^\\S+@\\S+\\.\\S+$"}
            />
          </label>
          <span className="profile__form-error">{errors.email}</span>
          {editIsSuccess && (
            <p className="profile__form-submit-success">
              {MESSAGE_UPDATE_PROFILE_OK}
            </p>
          )}
          {editIsFailed && (
            <p className="profile__form-submit-failed">
              {MESSAGE_UPDATE_PROFILE_FALE}
            </p>
          )}

          <label className="profile__buttons">
            {!isEdit ? (
              <>
                <button
                  type="submit"
                  className="profile__form-submit"
                  onClick={edit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="profile__button_logout"
                  onClick={onSignOut}
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={`profile__button-edit ${
                    hasChanges && isValid ? "" : "profile__button-edit-disabled"
                  }`}
                  onClick={saveProfile}
                  disabled={!hasChanges || !isValid }
                >
                  Сохранить
                </button>
              </>
            )}
          </label>
        </form>
      </main>
    </>
  );
}

export default Profile;
