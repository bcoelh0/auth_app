import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Col, Row } from "antd";

class Login extends React.Component {
  state = {
    loggedin: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data["token"] != undefined) {
              console.log(data);
              this.setState({ loggedin: true });
            } else {
              alert("Unable to authenticate");
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.loggedin) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Row>
            <Col span={8} offset={8}>
              <h1>Login!</h1>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("email", {
                    rules: [
                      { required: true, message: "Please input your email!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Email"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>Remember me</Checkbox>)}
                  <br />
                  <br />
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  &nbsp;Or <Link to="/register">register now!</Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Form.create()(Login);
