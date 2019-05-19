import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Row, Col } from "antd";

class Register extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.confirm
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data["created_at"] != undefined) {
              alert("Registered successfully");
              window.location = "/login";
            } else {
              alert("Unable to register");
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row>
          <Col span={8} offset={8}>
            <h1>Register!</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item label={<span>Name&nbsp;</span>}>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your name!",
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="Name" />)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Register);
