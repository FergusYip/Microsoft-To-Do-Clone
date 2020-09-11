import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, InputNumber, Select, Row, Col, Space } from 'antd';
import { REPEAT_UNIT } from '../../../utils/constants';
import AvatarToggle from './AvatarToggle';

const { Option } = Select;

const NewListModal = ({ visible, onOK, onCancel }) => {
  const [form] = Form.useForm();
  const [displayDaysOfWeeks, setDisplayDaysOfWeeks] = useState(false);

  function handleUnitSelect(value) {
    setDisplayDaysOfWeeks(value === REPEAT_UNIT.WEEKS);
  }

  useEffect(() => {
    resetForm();
    setDisplayDaysOfWeeks(false);
  }, [visible]);

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        form.resetFields();
        onOK(values);
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
      title="Repeat every ..."
      okText="Done"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={submitForm}
      afterClose={resetForm}
    >
      <div style={{ height: 96 }}>
        <Form
          form={form}
          layout="vertical"
          name="custom_repeat_modal"
          initialValues={{
            repeat: {
              frequency: 1,
              unit: REPEAT_UNIT.DAYS,
            },
            daysOfWeek: {
              sunday: false,
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
            },
          }}
          requiredMark={false}
        >
          <Form.Item name="repeat" colon={false}>
            <Input.Group>
              <Row gutter={8}>
                <Col span={4}>
                  <Form.Item
                    name={['repeat', 'frequency']}
                    noStyle
                    validateFirst
                    rules={[
                      {
                        type: 'number',
                        transform: (value) => {
                          return value || 1;
                        },
                        message: 'Frequency is not a number',
                      },
                      {
                        type: 'number',
                        min: 1,
                        message: 'Frequency must be positive',
                      },

                      {
                        type: 'number',
                        max: 999,
                        message: 'Frequency must be less than 1000',
                      },
                    ]}
                    normalize={(value) => {
                      return value || 1;
                    }}
                  >
                    <InputNumber min={1} max={999} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name={['repeat', 'unit']}
                    noStyle
                    rules={[{ required: true, message: '' }]}
                  >
                    <Select
                      style={{ width: '100%' }}
                      onSelect={handleUnitSelect}
                    >
                      <Option value={REPEAT_UNIT.DAYS}>Days</Option>
                      <Option value={REPEAT_UNIT.WEEKS}>Weeks</Option>
                      <Option value={REPEAT_UNIT.MONTHS}>Months</Option>
                      <Option value={REPEAT_UNIT.YEARS}>Years</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>
          <Form.Item>
            {displayDaysOfWeeks && (
              <Space>
                <Form.Item name={['daysOfWeek', 'sunday']} noStyle>
                  <AvatarToggle text="Sunday" />
                </Form.Item>
                <Form.Item name={['daysOfWeek', 'monday']} noStyle>
                  <AvatarToggle text="Monday" />
                </Form.Item>
                <Form.Item name={['daysOfWeek', 'tuesday']} noStyle>
                  <AvatarToggle text="Tuesday" />
                </Form.Item>
                <Form.Item name={['daysOfWeek', 'wednesday']} noStyle>
                  <AvatarToggle text="Wednesday" />
                </Form.Item>
                <Form.Item name={['daysOfWeek', 'thursday']} noStyle>
                  <AvatarToggle text="Thursday" />
                </Form.Item>
                <Form.Item name={['daysOfWeek', 'friday']} noStyle>
                  <AvatarToggle text="Friday" />
                </Form.Item>
                <Form.Item name={['daysOfWeek', 'saturday']} noStyle>
                  <AvatarToggle text="Saturday" />
                </Form.Item>
              </Space>
            )}
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewListModal);
