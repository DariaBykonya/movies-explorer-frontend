import "./Header.css";
import React from "react";
import { useLocation } from "react-router-dom";
import HeaderLogoLink from "../UI/HeaderLogoLink/HeaderLogoLink";
import Navigation from "../Navigation/Navigation";

function Header() {
  const { pathname } = useLocation();
  return (
    <header className={pathname === "/" ? "header header_main" : "header"}>
      <HeaderLogoLink />
      <Navigation />
    </header>
  );
}

export default Header;
