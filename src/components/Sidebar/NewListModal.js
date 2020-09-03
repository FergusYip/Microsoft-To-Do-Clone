import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Input, Radio } from 'antd';

const NewListModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new todo list"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
        requiredMark={false}
      >
        <Form.Item
          name="title"
          label="Name"
          colon={false}
          rules={[
            {
              whitespace: true,
              required: true,
              message: 'Please input the name of the new list!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewListModal);
