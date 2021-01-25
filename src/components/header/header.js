import React from "react";
import { Navbar, NavItem, Row } from "react-materialize";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory(),
    { isLogged, updateHeader, notifier } = props;

  return (
    <Row>
      <Navbar className="grey darken-2">
        <NavItem
          onClick={() => {
            if (isLogged) notifier("Logout realizado.");
            updateHeader();
            return history.push("/");
          }}
        >
          {isLogged ? "Logout" : "Login"}
        </NavItem>
        {isLogged ? (
          <NavItem onClick={() => history.push("/users")}>Usuários</NavItem>
        ) : null}
        <span className="company-title">WDG Automation</span>
      </Navbar>
    </Row>
  );
};

export default Header;
