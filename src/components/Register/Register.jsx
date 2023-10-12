import Logo from "../Logo/Logo"
import "./Register.css"
import { Link } from "react-router-dom";
import { useState } from "react";

function Register () {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const isFormValid = !nameError && name !== '' && !emailError && email !== '' && !passwordError && password !== '';

  const buttonClass = isFormValid
  ? 'register__button-form register__button_valid'
  : 'register__button-form register__button_invalid';

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    if (value.length < 2 || value.length > 30) {
      setNameError('Имя должно содержать от 2 до 30 символов');
    } else {
      setNameError('');
    }
  };
  
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailPattern = /^([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})$/;
    if (!emailPattern.test(value)) {
      setEmailError('Введите корректный email');
    } else {
      setEmailError('');
    }
  };
  
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError('Пароль должен содержать как минимум 8 символов');
    } else {
      setPasswordError('');
    }
  };

  return (
    <section className="register">
      <header className="register__logo">
        <Logo />
      </header>
      <main className="register__container">
        <div className="register__body">
            <h1 className="register__title">Добро пожаловать!</h1>
          <form
            className="register__form" id="form" noValidate
          >
            <label for="name" className="register__label">Имя</label>
            <input
            name="name"
            type="text"
            id="name"
            className={`register__input register__input_type_name ${nameError !== '' ? 'register__input_invalid' : ''}`}
            required
            minlength="2" maxlength="30"
            value={name}
            onChange={handleNameChange}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            />
          <span
            className={`register__input-error register__input-error_type_name ${nameFocused ? 'register__input-focused' : ''}`}>{nameError}</span>
          <label for="email" className="register__label">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            className={`register__input register__input_type_email ${emailError !== '' ? 'register__input_invalid' : ''}`}
            required
            pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <span
            className={`register__input-error email-error register__input-error_type_email ${emailFocused ? 'register__input-focused' : ''}`}>{emailError}</span>

          <label for="pass" className="register__label">Пароль</label>
          <input
            type="password"
            name="email"
            id="pass"
            className={`register__input register__input_type_password ${passwordError !== '' ? 'register__input_invalid' : ''}`}
            required
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <span
            className={`register__input-error register__input-error_type_password ${passwordFocused ? 'register__input-focused' : ''}`}>{passwordError}</span>
          <span className="register__form-error">
            {/* Нужно добавить тут общую валидацию при запросе на сервер */}
          </span>
            <button className={buttonClass} type="submit" disabled={!isFormValid}>Зарегистрироваться</button>
          </form>

          <p className="register__subtitle">Уже зарегистрированы? <Link to="/signin" className="register__link-navigate">Войти</Link>
            </p>
        </div>
      </main>
    </section>
)};

export default Register