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
  PaperClipOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import StepList from './StepList';
import {
  RepeatItem,
  DueDateItem,
  RemindMeItem,
  MyDayItem,
} from './TodoMenuItems';
import { connect, useSelector } from 'react-redux';
import {
  updateTodo,
  addStep,
  removeStep,
  updateStep,
} from '../../store/actions/todoActions';
import { useFirestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const step_input_id = 'step_input_area';

function TodoMenu({
  selectedTodoDetails,
  onClose,
  updateTodo,
  addStep,
  removeStep,
  updateStep,
}) {
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

  function stepInputSubmit(e) {
    e.preventDefault();
    const cleanedStep = newStep.trim().replace(/\s+/, ' ');
    setNewStep('');
    if (!cleanedStep) return;
    addStep(selectedTodo, cleanedStep);
    document.getElementById(step_input_id).focus();
  }

  function stepRemove(step) {
    removeStep(selectedTodo, step);
  }

  function stepUpdate(step) {
    updateStep(selectedTodo, step);
  }

  function onChangeCompletion(e) {
    updateTodo({ ...selectedTodo, isComplete: e.target.checked });
  }

  function toggleImportant() {
    updateTodo({ ...selectedTodo, isImportant: !selectedTodo.isImportant });
  }

  function updateNote(e) {
    const newNote = e.target.value.trim();
    if (newNote !== selectedTodo.note) {
      updateTodo({ ...selectedTodo, note: newNote });
    }
  }

  function handleNoteKeyDown(e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      e.target.value += '\t';
    }
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
          <StepList
            steps={selectedTodo.steps}
            onUpdate={stepUpdate}
            onRemove={stepRemove}
          />
          <List>
            <List.Item>
              <Space>
                <PlusOutlined onClick={stepInputSubmit} />
                <Input.TextArea
                  id={step_input_id}
                  placeholder={
                    selectedTodo.steps.length === 0 ? 'Add Step' : 'Next Step'
                  }
                  bordered={false}
                  onChange={stepInputOnChange}
                  onPressEnter={stepInputSubmit}
                  value={newStep}
                  style={{
                    resize: 'none',
                  }}
                  autoSize={{ minRows: 1 }}
                  maxLength={100}
                />
              </Space>
            </List.Item>
            <MyDayItem />
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
                onBlur={updateNote}
                defaultValue={selectedTodo.note}
                maxLength={500}
                onKeyDown={handleNoteKeyDown}
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
    addStep: (todo, stepTitle) => dispatch(addStep(todo, stepTitle)),
    removeStep: (todo, step) => dispatch(removeStep(todo, step)),
    updateStep: (todo, step) => dispatch(updateStep(todo, step)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(TodoMenu);
