import React, { useEffect } from 'react';
import { Form, Input, Button, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../calls/users";

function Register() {
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Register to BookMyShow</h1>
        <Form layout="vertical" onFinish={onFinish} style={styles.form}>
          <Form.Item
            label="Name"
            htmlFor="name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
            style={styles.formItem}
          >
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            rules={[{ required: true, message: "Email is required!" }]}
            style={styles.formItem}
          >
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            htmlFor="password"
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
            style={styles.formItem}
          >
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            label="Register as a Partner"
            htmlFor="role"
            name="role"
            initialValue={false}
            rules={[{ required: true, message: "Please select an option!" }]}
            style={styles.formItem}
          >
            <Radio.Group>
              <Radio value="partner">Yes</Radio>
              <Radio value="user">No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item style={styles.formItem}>
            <Button type="primary" block htmlType="submit" style={styles.button}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={styles.textContainer}>
          <p style={styles.text}>
            Already a user? <Link to="/login" style={styles.link}>Login now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    marginBottom: '20px',
  },
  formItem: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    fontSize: '16px',
    fontWeight: '600',
    padding: '10px 20px',
    borderRadius: '4px',
  },
  textContainer: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },
  text: {
    marginBottom: '10px',
  },
  link: {
    color: '#1890ff',
    textDecoration: 'none',
  },
};

export default Register;
