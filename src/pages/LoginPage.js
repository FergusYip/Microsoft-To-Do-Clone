import React from 'react';
import { Form, Input, Button, Checkbox, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';

export default function LoginPage() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthCard title="Login">
      <Form
        layout="vertical"
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Space>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text>Don't have an account? </Typography.Text>
      <Link to="/register" component={Typography.Link}>
        Register here!
      </Link>
    </AuthCard>
  );
}
