import React, { useState } from 'react';
import { List, Dropdown, Menu, Typography } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateTodo } from '../../../store/actions/todoActions';
import { REPEAT_TYPE, REPEAT_UNIT } from '../../../utils/constants';
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
      repeat: { type: REPEAT_TYPE.DAILY, date: new Date() },
    });
  }

  function selectWeekly() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_TYPE.WEEKLY, date: new Date() },
    });
  }

  function selectWeekdays() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_TYPE.WEEKDAYS, date: new Date() },
    });
  }

  function selectMonthly() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_TYPE.MONTHLY, date: new Date() },
    });
  }

  function selectYearly() {
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_TYPE.YEARLY, date: new Date() },
    });
  }

  function selectCustom() {
    setIsSettingCustom(true);
  }

  function handleCustomCancel() {
    setIsSettingCustom(false);
  }
  function handleCustomOK(repeat) {
    setIsSettingCustom(false);
    updateTodo({
      ...todo,
      repeat: { type: REPEAT_TYPE.CUSTOM, ...repeat, date: new Date() },
    });
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

  function getCustomTitle(repeat) {
    switch (repeat.unit) {
      case REPEAT_UNIT.DAYS:
        return repeat.frequency === 1 ? (
          <TitleSubtitle title="Daily" />
        ) : (
          <TitleSubtitle title={`Every ${repeat.frequency} days`} />
        );
      case REPEAT_UNIT.WEEKS:
        return repeat.frequency === 1 ? (
          <TitleSubtitle title="Weekly" />
        ) : (
          <TitleSubtitle title={`Every ${repeat.frequency} weeks`} />
        );
      case REPEAT_UNIT.MONTHS:
        return repeat.frequency === 1 ? (
          <TitleSubtitle title="Monthly" />
        ) : (
          <TitleSubtitle title={`Every ${repeat.frequency} months`} />
        );
      case REPEAT_UNIT.YEARS:
        return repeat.frequency === 1 ? (
          <TitleSubtitle title="Yearly" />
        ) : (
          <TitleSubtitle title={`Every ${repeat.frequency} years`} />
        );
    }
  }

  function getTitle() {
    if (!todo) return '';

    switch (todo.repeat.type) {
      case REPEAT_TYPE.DAILY:
        return <TitleSubtitle title="Daily" />;
      case REPEAT_TYPE.WEEKLY:
        return (
          <TitleSubtitle
            title="Weekly"
            subtitle={moment.unix(todo.repeat.date.seconds).format('dddd')}
          />
        );
      case REPEAT_TYPE.WEEKDAYS:
        return <TitleSubtitle title="Weekly" subtitle="Weekdays" />;
      case REPEAT_TYPE.MONTHLY:
        return <TitleSubtitle title="Monthly" />;
      case REPEAT_TYPE.YEARLY:
        return <TitleSubtitle title="Yearly" />;
      case REPEAT_TYPE.CUSTOM:
        return getCustomTitle(todo.repeat);
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
            title={getTitle()}
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
