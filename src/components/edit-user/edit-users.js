import React, { useState, useEffect } from "react";
import { Row, Col, Card, Input, Button } from "react-materialize";
import { useStore } from "react-redux";
import { getUserById, updateUserById } from "../../api";

const EditUser = ({ match, notifier }) => {
  const store = useStore(),
    [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    const loadUser = async () => {
      const response = await getUserById(match.params.id, store);
      setUser(response.data.data);
    };

    loadUser();
  }, [store, match]);

  const submitUpdate = async () => {
    await updateUserById(user, store);
    notifier("Usuário atualizado.");
  };

  return (
    <Row>
      <Col m={12} s={12}>
        <h5 className="subtitle">Edição de usuário</h5>
        <Card>
          <Row>
            <img
              alt="Foto"
              className="col materialboxed s4 m2"
              src={`https://reqres.in/img/faces/${match.params.id}-image.jpg`}
            ></img>
            <Input
              type="text"
              label="Nome"
              s={12}
              m={10}
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <Input
              type="text"
              label="Sobrenome"
              s={12}
              m={10}
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
            <Input
              type="text"
              label="Email"
              s={12}
              value={user.email}
              readOnly
            />
            <Col s={12} m={12}>
              <Button
                waves="light"
                className="blue darken-2"
                onClick={submitUpdate}
              >
                ATUALIZAR
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default EditUser;
