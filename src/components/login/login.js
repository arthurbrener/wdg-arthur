import React, { useState } from "react";
import { Row, Col, Card, Input, Button } from "react-materialize";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "../../actions";
import { login } from "../../api";

const Login = (props) => {
  const history = useHistory(),
    { updateHeader, loginAction, notifier } = props,
    [loginData, setLoginData] = useState({ email: "", password: "" });

  const submitLogin = async () => {
    const response = await login(loginData);
    if (response?.status === 200) {
      loginAction(response.data.token);
      history.push("/users");
      updateHeader();
    } else {
      notifier("Email e/ou senha incorretos.");
    }
  };

  return (
    <Row>
      <Col m={12} s={12}>
        <h5>Login</h5>
        <Card>
          <Row>
            <Input
              placeholder="endereço@email.com"
              type="email"
              label="Email"
              s={12}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <Input
              placeholder="Senha"
              label="Senha"
              type="password"
              s={12}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <Col s={12} m={12}>
              <Button
                waves="light"
                className="blue darken-2"
                onClick={submitLogin}
              >
                ENTRAR
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (store) => ({
  token: store.clickState.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loginAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
