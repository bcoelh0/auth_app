import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

class Home extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8} offset={8}>
            <h1>Home!</h1>
            <p>
              Welcome. If it's your first time you may want to{" "}
              <Link to="/register">register</Link>.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
