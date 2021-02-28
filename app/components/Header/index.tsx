import React, { ReactElement } from "react";
import { useHistory } from "react-router";

interface HeaderProps {
  internal?: boolean;
}

const Header = ({ internal = false }: HeaderProps): ReactElement => {
  const history = useHistory();

  return (
    <header className={`main-header ${internal && "main-header--internal"}`}>
      {internal && (
        <a className="back-home" data-js="back-home" onClick={history.goBack}>
          <img
            className="back-home__icon"
            src="/images/chevron.svg"
            alt="< back"
          />
        </a>
      )}
      <img
        className="main-header__logo"
        data-js="logo"
        src="/images/logo.svg"
        alt="BRAND NAME"
      />
    </header>
  );
};

export default Header;
