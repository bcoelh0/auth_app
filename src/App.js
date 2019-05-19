import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Welcome from "./components/welcome";

import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    loggedin: false
  };

  loggedIn = () => {
    return localStorage.getItem("authToken") != null;
  }

  render() {
    let login, register;
    if(this.loggedIn()){
      login = <Menu.Item key="logout" onClick={ () => {
          localStorage.removeItem("authToken");
          window.location = "/";
        }}>
        Logout
      </Menu.Item>
    }
    else{
      login = <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      register = <Menu.Item key="register">
          <Link to="/register">Register</Link>
        </Menu.Item>
    }

    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              {login}
              {register}
            </Menu>
          </Header>
          <Content>
            <div
              style={{
                background: "#fff",
                padding: 24,
                minHeight: 280,
                paddingTop: 80,
                paddingBottom: 40
              }}
            >
              <Route exact path="/" render={() => (
                this.loggedIn() ? <Redirect to="/welcome"/> : <Home />
              )} />
              <Route path="/welcome" render={() => (
                this.loggedIn() ? <Welcome /> : <Redirect to="/"/>
              )} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
