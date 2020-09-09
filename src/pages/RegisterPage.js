import React, { useEffect } from 'react';
import { Form, Input, Button, Space, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';

function RegisterPage({ signUp, authError }) {
  const onFinish = (values) => {
    values = { ...values, name: values.name.trim() };
    console.log('Success:', values);
    signUp(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    authError && message.error(authError, 3);
  }, [authError]);

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
        validateTrigger="onFinished"
      >
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
              {
                type: 'string',
                message: 'Please enter a valid email!',
              },
              {
                whitespace: true,
                min: 1,
                message: 'Please input your name!',
              },
              {
                max: 50,
                message: 'Name must be at most 50 characters!',
              },
            ]}
          >
            <Input />
          </Form.Item>

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
                message: 'Please enter a valid email!',
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
              {
                type: 'string',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
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
            validateTrigger="onChange"
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

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
