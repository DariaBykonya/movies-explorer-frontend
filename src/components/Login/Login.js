import "./Login.css";
import React, { useState } from "react";
import SignForm from "../SignForm/SignForm";
import SignInput from "../UI/SignInput/SignInput";
import Preloader from "../Preloader/Preloader";
import { Link } from "react-router-dom";
import HeaderLogo from "../../images/header_logo.svg";

function Login({ onLogin }) {
  const [isLoader, setIsLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setIsLoader(true);
    onLogin(email, password)
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => setIsLoader(false));
  }

  return (
    <div className="login">
      <>
        <Link className="header__logo" to="/">
          <img src={HeaderLogo} alt="Логотип" />
        </Link>
        {isLoader ? (
          <Preloader />
        ) : (
          <SignForm
            title="Nice to see you!"
            submitBtnText="Login"
            linkTo="/signup"
            text="Not registered yet?"
            textLink="Register"
            handleSubmit={handleLogin}
            isError={isError}
            isDisabled={!isValid}
          >
            <SignInput
              id="signup-email"
              type="email"
              name="email"
              label="E-mail"
              inputValue={email}
              setValue={setEmail}
              setError={setValidationErrors}
              isRequired={true}
              pattern={"^\\S+@\\S+\\.\\S+$"}
              errors={validationErrors}
              setIsValid={setIsValid}
            />
            <SignInput
              id="signup-password"
              type="password"
              name="password"
              label="Password"
              inputValue={password}
              setValue={setPassword}
              setError={setValidationErrors}
              isRequired={true}
              minLength="8"
              errors={validationErrors}
              setIsValid={setIsValid}
            />
          </SignForm>
        )}
      </>
    </div>
  );
}

export default Login;
