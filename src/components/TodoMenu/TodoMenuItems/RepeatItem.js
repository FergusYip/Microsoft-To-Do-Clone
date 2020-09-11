import React, { useState } from 'react';
import { List, Dropdown, Menu, Typography } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateTodo } from '../../../store/actions/todoActions';
import { REPEAT_PRESET } from '../../../utils/constants';
import moment from 'moment';
import CustomRepeatModal from './CustomRepeatModal';

function TitleSubtitle({ title, subtitle }) {
  return (
    <>
      <Typography.Text>{title}</Typography.Text>
      <br />
      <Typography.Text style={{ fontWeight: 300 }}>{subtitle}</Typography.Text>
    </>
  );
}

function RepeatItem({ todo, updateTodo }) {
  const [isSettingCustom, setIsSettingCustom] = useState(false);
  const id = 'repeat_item';

  function selectDaily() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_PRESET.DAILY, date: new Date() },
    });
  }

  function selectWeekly() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_PRESET.WEEKLY, date: new Date() },
    });
  }

  function selectWeekdays() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_PRESET.WEEKDAYS, date: new Date() },
    });
  }

  function selectMonthly() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_PRESET.MONTHLY, date: new Date() },
    });
  }

  function selectYearly() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_PRESET.YEARLY, date: new Date() },
    });
  }

  function selectCustom() {
    setIsSettingCustom(true);
  }

  function handleCustomCancel() {
    setIsSettingCustom(false);
  }
  function handleCustomOK() {
    setIsSettingCustom(false);
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={selectDaily}>Daily</Menu.Item>
      <Menu.Item onClick={selectWeekly}>Weekly</Menu.Item>
      <Menu.Item onClick={selectWeekdays}>Weekdays</Menu.Item>
      <Menu.Item onClick={selectMonthly}>Monthly</Menu.Item>
      <Menu.Item onClick={selectYearly}>Yearly</Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={selectCustom}>Custom</Menu.Item>
    </Menu>
  );

  const getRoot = () => {
    return document.getElementById(id);
  };

  function getTodoTitle() {
    if (!todo) return '';

    switch (todo.repeat.type) {
      case REPEAT_PRESET.DAILY:
        return <TitleSubtitle title="Daily" />;
      case REPEAT_PRESET.WEEKLY:
        return (
          <TitleSubtitle
            title="Weekly"
            subtitle={moment.unix(todo.repeat.date.seconds).format('dddd')}
          />
        );
      case REPEAT_PRESET.WEEKDAYS:
        return <TitleSubtitle title="Weekly" subtitle="Weekdays" />;
      case REPEAT_PRESET.MONTHLY:
        return <TitleSubtitle title="Monthly" />;
      case REPEAT_PRESET.YEARLY:
        return <TitleSubtitle title="Yearly" />;
      default:
        break;
    }
  }

  return (
    <List.Item id={id}>
      <Dropdown
        overlay={menu}
        placement="topLeft"
        arrow
        trigger={['click']}
        getPopupContainer={getRoot}
      >
        {todo && todo.repeat ? (
          <List.Item.Meta
            avatar={<RetweetOutlined />}
            title={getTodoTitle()}
            style={{ margin: 0 }}
          />
        ) : (
          <List.Item.Meta avatar={<RetweetOutlined />} title="Repeat" />
        )}
      </Dropdown>
      <CustomRepeatModal
        visible={isSettingCustom}
        onOK={handleCustomOK}
        onCancel={handleCustomCancel}
      />
    </List.Item>
  );
}

const mapStateToProps = (state) => {
  const todo =
    state.firestore.data.todos &&
    state.firestore.data.todos[state.selectedTodoID];
  return { todo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (todo) => dispatch(updateTodo(todo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepeatItem);
