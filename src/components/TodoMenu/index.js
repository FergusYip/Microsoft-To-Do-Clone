import React, { useState } from 'react';
import {
  List,
  Input,
  Space,
  Drawer,
  Checkbox,
  PageHeader,
  Button,
  Tooltip,
  Divider,
  message,
} from 'antd';
import {
  PlusOutlined,
  CoffeeOutlined,
  PaperClipOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import StepList from './StepList';
import TodoMenuItem from './TodoMenuItem';
import { RepeatItem, DueDateItem, RemindMeItem } from './TodoMenuItems';

export default function TodoMenu({ todo, modifyTodo, visible, onClose }) {
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

  function toggleFavorite() {
    const modifiedTodo = { ...todo };
    modifiedTodo.isFavorite = !modifiedTodo.isFavorite;
    modifyTodo(modifiedTodo);
  }

  return (
    todo && (
      <Drawer
        headerStyle={{ padding: 0 }}
        title={
          <PageHeader
            onBack={() => null}
            title={todo.title}
            backIcon={<Checkbox checked={todo.isComplete} />}
            extra={
              <Tooltip title="Favorite" mouseEnterDelay={0.5}>
                <Button
                  icon={todo.isFavorite ? <StarFilled /> : <StarOutlined />}
                  onClick={toggleFavorite}
                  shape="circle"
                  type="link"
                ></Button>
              </Tooltip>
            }
          />
        }
        bodyStyle={{ paddingTop: 0 }}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={300}
      >
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
          <TodoMenuItem avatar={<CoffeeOutlined />} title="Add to My Day" />
          <RemindMeItem />
          <DueDateItem />
          <RepeatItem />
          <List.Item>
            <List.Item.Meta avatar={<PaperClipOutlined />} title="Add File" />
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
        <Divider />
      </Drawer>
    )
  );
}
