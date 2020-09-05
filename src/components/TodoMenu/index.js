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
import { connect, useSelector } from 'react-redux';
import { updateTodo } from '../../store/actions/todoActions';
import { useFirestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

function TodoMenu({ selectedTodoDetails, onClose, updateTodo }) {
  const [newStep, setNewStep] = useState('');

  // function modifyStep(modifiedStep) {
  //   const modifiedTodo = { ...todo };
  //   modifiedTodo.steps = modifiedTodo.steps.map((step) => {
  //     console.log(step.id === modifiedStep.id);
  //     return step.id === modifiedStep.id ? modifiedStep : step;
  //   });
  //   modifyTodo(modifiedTodo);
  // }

  useFirestoreConnect(() => {
    return selectedTodoDetails
      ? [
          {
            collection: 'todos',
            doc: selectedTodoDetails.todoID,
            storeAs: 'selectedTodo',
          },
        ]
      : null;
  });
  const selectedTodo = useSelector(
    ({ firestore: { data } }) => data.selectedTodo
  );

  function stepInputOnChange(e) {
    setNewStep(e.target.value);
  }

  function stepInputSubmit() {
    if (!newStep) return;
    setNewStep('');
  }
  function onChangeCompletion(e) {
    const newIsComplete = e.target.checked;
    updateTodo({ ...selectedTodo, isComplete: newIsComplete });
    console.log(e.target.checked);
  }

  function toggleImportant() {
    updateTodo({ ...selectedTodo, isImportant: !selectedTodo.isImportant });
  }

  return (
    <Drawer
      headerStyle={{ padding: 0 }}
      title={
        selectedTodo && (
          <PageHeader
            onBack={() => null}
            title={selectedTodo.title}
            backIcon={
              <Checkbox
                checked={selectedTodo.isComplete}
                onChange={onChangeCompletion}
              />
            }
            extra={
              <Tooltip title="Important" mouseEnterDelay={0.5}>
                <Button
                  icon={
                    selectedTodo.isImportant ? <StarFilled /> : <StarOutlined />
                  }
                  onClick={toggleImportant}
                  shape="circle"
                  type="link"
                ></Button>
              </Tooltip>
            }
          />
        )
      }
      bodyStyle={{ paddingTop: 0 }}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={!!selectedTodoDetails}
      width={300}
    >
      {selectedTodo && (
        <>
          <StepList steps={selectedTodo.steps} modifyStep={null} />
          <List>
            <List.Item>
              <Space>
                <PlusOutlined />
                <Input
                  placeholder={
                    selectedTodo.steps.length === 0 ? 'Add Step' : 'Next Step'
                  }
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
        </>
      )}
    </Drawer>
  );
}

const mapStateToProps = (state) => {
  const { selectedTodoDetails } = state;
  return {
    selectedTodoDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (todo) => dispatch(updateTodo(todo)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(TodoMenu);
