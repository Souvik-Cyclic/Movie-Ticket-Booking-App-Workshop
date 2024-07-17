import React, { useEffect } from 'react';
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ResetPassword } from '../calls/users';

function Reset() {
  const onFinish = async (values) => {
    try {
      const response = await ResetPassword(values);
      if (response.status === "success") {
        message.success(response.message);
        window.location.href = '/login';
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
        <h1 style={styles.heading}>Reset Password</h1>
        <Form layout="vertical" onFinish={onFinish} style={styles.form}>
          <Form.Item
            label="OTP"
            htmlFor="otp"
            name="otp"
            rules={[{ required: true, message: "OTP is required" }]}
            style={styles.formItem}
          >
            <Input
              id="otp"
              type="number"
              placeholder="Enter your OTP"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            htmlFor="password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
            style={styles.formItem}
          >
            <Input
              id="password"
              type="password"
              placeholder="Enter your new password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item style={styles.formItem}>
            <Button type="primary" block htmlType="submit" style={styles.button}>
              RESET PASSWORD
            </Button>
          </Form.Item>
        </Form>
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
};

export default Reset;
