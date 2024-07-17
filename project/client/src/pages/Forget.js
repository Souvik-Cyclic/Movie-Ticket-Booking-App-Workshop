import React, { useEffect } from 'react';
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPassword } from '../calls/users';

function Forget() {
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await ForgetPassword(values);
      if (response.status === "success") {
        message.success(response.message);
        alert("OTP sent to your email");
        window.location.href = '/reset';
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Forget Password</h1>
        <Form layout="vertical" onFinish={onFinish} style={styles.form}>
          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
            style={styles.formItem}
          >
            <Input
              id="email"
              type="text"
              placeholder="Enter your Email"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item style={styles.formItem}>
            <Button type="primary" block htmlType="submit" style={styles.button}>
              SEND OTP
            </Button>
          </Form.Item>
        </Form>
        <div style={styles.linkContainer}>
          <p>
            Existing User? <Link to="/login" style={styles.link}>Login Here</Link>
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
    fontSize: "16px",
    fontWeight: "600",
    padding: '10px 20px',
    borderRadius: '4px',
  },
  linkContainer: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#1890ff',
    textDecoration: 'none',
  },
};

export default Forget;
