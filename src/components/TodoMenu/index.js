import React, { useState } from 'react';
import { List, Typography, Input, Space } from 'antd';
import {
  PlusOutlined,
  CoffeeOutlined,
  BellOutlined,
  CalendarOutlined,
  RetweetOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import StepList from './StepList';

export default function TodoMenu({ todo, modifyTodo }) {
  const [newStep, setNewStep] = useState('');

  function modifyStep(modifiedStep) {
    const modifiedTodo = { ...todo };
    modifiedTodo.steps = modifiedTodo.steps.map((step) => {
      console.log(step.id === modifiedStep.id);
      return step.id === modifiedStep.id ? modifiedStep : step;
    });
    console.log(todo);
    console.log(modifiedTodo);
    modifyTodo(modifiedTodo);
  }

  function stepInputOnChange(e) {
    setNewStep(e.target.value);
  }

  function stepInputSubmit() {
    if (!newStep) return;
    setNewStep('');
  }

  return (
    <div>
      <Typography.Title level={3}>{todo.title}</Typography.Title>
      <StepList steps={todo.steps} modifyStep={modifyStep} />
      <List>
        <List.Item>
          <Space>
            <PlusOutlined />
            <Input
              placeholder={todo.steps.length === 0 ? 'Add Step' : 'Next Step'}
              bordered={false}
              onChange={stepInputOnChange}
              onPressEnter={stepInputSubmit}
              value={newStep}
            />
          </Space>
        </List.Item>
        <List.Item>
          <Space>
            <CoffeeOutlined />
            Add to My Day
          </Space>
        </List.Item>
        <List.Item>
          <Space>
            <BellOutlined />
            Remind Me
          </Space>
        </List.Item>
        <List.Item>
          <Space>
            <CalendarOutlined />
            Add Due Date
          </Space>
        </List.Item>
        <List.Item>
          <Space>
            <RetweetOutlined />
            Repeat
          </Space>
        </List.Item>
        <List.Item>
          <Space>
            <PaperClipOutlined />
            Add File
          </Space>
        </List.Item>
        <List.Item>
          <Input.TextArea
            placeholder="Add Note"
            autoSize={{ minRows: 4 }}
            bordered={false}
            style={{ resize: 'none' }}
          />
        </List.Item>
      </List>
    </div>
  );
}
