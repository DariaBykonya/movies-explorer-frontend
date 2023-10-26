import "./SignForm.css";
import { Link } from "react-router-dom";

function SignForm({
  title,
  children,
  submitBtnText,
  text,
  textLink,
  linkTo,
  handleSubmit,
  isError,
  isDisabled,
}) {
  return (
    <section className="sign">
      <h2 className="sign__title">{title}</h2>
      <form className="sign__form" name="form-sign" onSubmit={handleSubmit}>
        <fieldset className="sign__field">{children}</fieldset>
        <p className={`sign__error ${isError && "sign__error-visible"}`}>
          Что-то пошло не так...
        </p>
        <button type="submit" className={`sign__button ${isDisabled ? 'sign__button-disabled' : ''}`} disabled={isDisabled}>
          {submitBtnText}
        </button>
      </form>
      <p className="sign__text">
        {text}
        <Link className="sign__link" to={linkTo}>
          {textLink}
        </Link>
      </p>
    </section>
  );
}

export default SignForm;
