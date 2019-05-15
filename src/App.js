import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
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
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
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
            <Route path="/" exact component={Home} />
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

export default App;
