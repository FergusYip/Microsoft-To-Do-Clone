import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input } from 'antd';

const NewListModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const inputRef = useRef(null);

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible]);

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Create a new todo list"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={submitForm}
      afterClose={resetForm}
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
            {
              type: 'string',
              max: 100,
              message: 'Name cannot be longer than 100 characters',
            },
          ]}
        >
          <Input
            ref={inputRef}
            onPressEnter={submitForm}
            autoFocus
            maxLength={101}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewListModal);
