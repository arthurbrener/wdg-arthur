import React, { useState, useEffect } from "react";
import { Row, Col, Card, Input, Button } from "react-materialize";
import { useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserById, updateUserById } from "../../api";

const EditUser = ({ match, notifier, loading }) => {
  const history = useHistory(),
    store = useStore(),
    [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    const loadUser = async () => {
      loading(true);
      const response = await getUserById(match.params.id, store);
      if (response === 404) {
        history.push("/not-found");
        loading(false);
      } else {
        setUser(response.data.data);
        loading(false);
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, match.params.id]);

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
