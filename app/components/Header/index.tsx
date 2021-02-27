import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  internal?: boolean;
}

const Header = ({ internal = false }: HeaderProps): ReactElement => (
  <header className={`main-header ${internal && "main-header--internal"}`}>
    {internal && (
      <NavLink className="back-home" data-js="back-home" exact to="/">
        <img
          className="back-home__icon"
          src="/images/chevron.svg"
          alt="< back"
        />
      </NavLink>
    )}
    <img
      className="main-header__logo"
      data-js="logo"
      src="/images/logo.svg"
      alt="BRAND NAME"
    />
  </header>
);

export default Header;
