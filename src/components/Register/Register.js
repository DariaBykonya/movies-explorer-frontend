import "./Register.css";
import React, { useState } from "react";
import SignForm from "../SignForm/SignForm";
import SignInput from "../UI/SignInput/SignInput";
import Preloader from "../Preloader/Preloader";
import { Link } from "react-router-dom";
import HeaderLogo from "../../images/header_logo.svg";

function Register({ onRegister }) {
  const [isLoader, setIsLoader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleSubmitRegister(e) {
    e.preventDefault();
    setIsLoader(true);
    onRegister(name, email, password)
      .then(() => {
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => setIsLoader(false));
  }

  return (
    <div className="register">
      <>
        <Link className="header__logo" to="/">
          <img src={HeaderLogo} alt="Логотип" />
        </Link>
        {isLoader ? (
          <Preloader />
        ) : (
          <SignForm
            title="Welcome!"
            submitBtnText="Register"
            linkTo="/signin"
            text="Already registered?"
            textLink="Login"
            handleSubmit={handleSubmitRegister}
            isError={isError}
            isDisabled={!isValid}
          >
            <SignInput
              id="signup-name"
              type="name"
              name="name"
              label="Name"
              inputValue={name}
              setValue={setName}
              setError={setValidationErrors}
              minLength="2"
              pattern={"^[\\-A-Za-zА-Яа-я\\s]*$"}
              maxLength="30"
              errors={validationErrors}
              setIsValid={setIsValid}
            />
            <SignInput
              id="signup-email"
              type="email"
              name="email"
              pattern={"^\\S+@\\S+\\.\\S+$"}
              label="E-mail"
              inputValue={email}
              setValue={setEmail}
              setError={setValidationErrors}
              isRequired={true}
              errors={validationErrors}
              setIsValid={setIsValid}
            />
            <SignInput
              id="signup-password"
              type="password"
              name="password"
              label="Password"
              inputValue={password}
              minLength="8"
              setValue={setPassword}
              setError={setValidationErrors}
              isRequired={true}
              errors={validationErrors}
              setIsValid={setIsValid}
            />
          </SignForm>
        )}
      </>
    </div>
  );
}

export default Register;
