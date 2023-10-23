import React from "react";
import { Link } from "react-router-dom";
import HeaderLogo from "../../../images/header_logo.svg";
import "./HeaderLogoLink.css";

function HeaderLogoLink() {
  return (
    <Link to="/" className="header-logo-link">
      <img src={HeaderLogo} alt="Логотип" />
    </Link>
  );
}

export default HeaderLogoLink;
