import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

class Welcome extends Component {
  state = {
    message: null,
    image: null
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken")
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({message: data.message, image: data.image});
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={8} offset={8}>
            <h1>Welcome!</h1>
            <p>
            {this.state.message}
            <br/>
            <img src={this.state.image} />
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Welcome;
