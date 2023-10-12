import Logo from "../Logo/Logo"
import "./Login.css"
import { Link } from "react-router-dom";
import { useState } from "react";

function Login () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const isFormValid = !emailError && email !== '' && !passwordError && password !== '';

  const buttonClass = isFormValid
  ? 'login__button-form login__button-form_valid'
  : 'login__button-form login__button-form_invalid';
  
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
    <section className="login">
      <header className="login__logo">
        <Logo />
      </header>
      <main className="login__container">
        <div className="login__body">
            <h1 className="login__title">Рады видеть!</h1>
          <form
            className="login__form" id="form"
          >
          <label for="email" className="login__label">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            className={`login__input login__input_type_email ${emailError !== '' ? 'login__input_invalid' : ''}`}
            required
            pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <span
            className={`login__input-error login__input-error_type_email ${emailFocused ? 'login__input-focused' : ''}`} for="email">{emailError}</span>
          <label for="pass" className="login__label">Пароль</label>
          <input
            type="password"
            name="password"
            id="pass"
            className={`login__input login__input_type_password ${passwordError !== '' ? 'login__input_invalid' : ''}`}
            required
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <span
            className={`login__input-error login__input-error_type_password ${passwordFocused ? 'login__input-focused' : ''}`} for="pass">{passwordError}</span>
          <span className="login__form-error">
          {/* Нужно добавить тут общую валидацию при запросе на сервер */}
          </span>
            <button className={buttonClass} type="submit" disabled={!isFormValid}>Войти</button>
          </form>

          <p className="login__subtitle">Ещё не зарегистрированы? <Link to="/signup" className="login__link-navigate">Регистрация</Link>
            </p>
        </div>
      </main>
    </section>
)};

export default Login