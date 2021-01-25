import React, { Component } from "react";
import "./App.scss";
import Header from "./components/header/header";
import Login from "./components/login/login";
import UserList from "./components/users/users";
import EditUser from "./components/edit-user/edit-users";
import NotFound from "./components/not-found/not-found";
import Notify from "./components/notify/notify";
import { Container } from "react-materialize";
import { Switch, Route } from "react-router-dom";
import FlashMessage from "react-flash-message";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: /^(\/users|\/users\/|\/users\/[1-9][0-2]*)$/.test(
        window.location.pathname
      ),
      notify: { message: null, key: 0 },
    };
  }

  render() {
    return (
      <div>
        {this.state.notify.message ? (
          <FlashMessage duration={4000} key={this.state.notify.key}>
            <Notify message={this.state.notify.message} />
          </FlashMessage>
        ) : null}
        <Header
          isLogged={this.state.isLogged}
          updateHeader={() => this.setState({ isLogged: false })}
          notifier={(text) => {
            this.setState({
              notify: {
                message: text,
                key: this.state.notify.key + 1,
              },
            });
          }}
        />
        <Container>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Login
                  updateHeader={() => this.setState({ isLogged: true })}
                  notifier={(text) => {
                    this.setState({
                      notify: {
                        message: text,
                        key: this.state.notify.key + 1,
                      },
                    });
                  }}
                />
              )}
            />
            <Route
              exact
              path="/users"
              render={() => (
                <UserList
                  location
                  notifier={(text) => {
                    this.setState({
                      notify: {
                        message: text,
                        key: this.state.notify.key + 1,
                      },
                    });
                  }}
                />
              )}
            />
            <Route
              path="/users/:id(\d+)"
              render={(props) => (
                <EditUser
                  match={props.match}
                  notifier={(text) => {
                    this.setState({
                      notify: {
                        message: text,
                        key: this.state.notify.key + 1,
                      },
                    });
                  }}
                />
              )}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
