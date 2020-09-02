import React from 'react';
import { Form, Input, Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';

export default function RegisterPage() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthCard title="Register">
      <Form
        layout="vertical"
        name="register"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                type: 'string',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters',
              },
              {
                max: 32,
                message: 'Password must be at most 32 characters!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <Typography.Text>Already have an account? </Typography.Text>
      <Link to="/login" component={Typography.Link}>
        Login here!
      </Link>
    </AuthCard>
  );
}
