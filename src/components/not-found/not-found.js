import React from "react";
import { useHistory } from "react-router-dom";
import { Row } from "react-materialize";

const NotFound = () => {
  const history = useHistory();

  return (
    <Row>
      <div>
        Página não encontrada.{" "}
        <span
          className="text-link"
          onClick={() => {
            return history.push("/");
          }}
        >
          Retornar à tela de login.
        </span>
      </div>
    </Row>
  );
};
export default NotFound;
