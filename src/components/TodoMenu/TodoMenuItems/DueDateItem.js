import React, { useState } from 'react';
import { List, Dropdown, Menu, Row, Col, Typography, Button } from 'antd';
import { CalendarOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateTodo } from '../../../store/actions/todoActions';
import {
  getDueToday,
  getDueTomorrow,
  getDueNextWeek,
} from '../../../utils/dueDate';

const TIME_FORMAT = 'ddd';

function DueDateItem({ todo, updateTodo }) {
  const [dueToday, setDueToday] = useState(null);
  const [dueTomorrow, setDueTomorrow] = useState(null);
  const [dueNextWeek, setDueNextWeek] = useState(null);

  const id = 'due_date_item';

  function setReminderTimes() {
    setDueToday(getDueToday());
    setDueTomorrow(getDueTomorrow());
    setDueNextWeek(getDueNextWeek());
  }

  function selectToday() {
    updateTodo({ ...todo, dueDate: dueToday.toDate() });
  }
  function selectTomorrow() {
    updateTodo({ ...todo, dueDate: dueTomorrow.toDate() });
  }
  function selectNextWeek() {
    updateTodo({ ...todo, dueDate: dueNextWeek.toDate() });
  }

  function handleCancelDueDate() {
    updateTodo({ ...todo, dueDate: null });
  }

  function getDueDateTitle(dueDate) {
    if (!dueDate) return 'Add Due Date';

    const due = moment.unix(dueDate.seconds);
    const now = moment().startOf('day');

    const dateDiff = Math.round(moment.duration(now.diff(due)).asDays());
    return (
      <>
        <Typography.Text style={{ display: 'inline-block', width: 175 }}>
          Due{' '}
          {Math.abs(dateDiff) > 1
            ? due.format('ddd, D MMMM')
            : dateDiff === 0
            ? 'Today'
            : dateDiff === -1
            ? 'Tomorrow'
            : 'Yesterday'}
        </Typography.Text>
      </>
    );
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={selectToday}>
        <Row>
          <Col flex="auto">
            <Typography.Text>Today</Typography.Text>
          </Col>
          <Col flex={0}>
            <Typography.Text type="secondary" style={{ textAlign: 'right' }}>
              {dueToday && dueToday.format(TIME_FORMAT)}
            </Typography.Text>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item onClick={selectTomorrow}>
        <Row>
          <Col flex="auto">
            <Typography.Text>Tomorrow</Typography.Text>
          </Col>
          <Col flex={0}>
            <Typography.Text type="secondary" style={{ textAlign: 'right' }}>
              {dueTomorrow && dueTomorrow.format(TIME_FORMAT)}
            </Typography.Text>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item onClick={selectNextWeek}>
        <Row>
          <Col flex="auto">
            <Typography.Text>Next Week</Typography.Text>
          </Col>
          <Col flex={0}>
            <Typography.Text type="secondary" style={{ textAlign: 'right' }}>
              {dueNextWeek && dueNextWeek.format(TIME_FORMAT)}
            </Typography.Text>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>Pick a Date</Menu.Item>
    </Menu>
  );

  const getRoot = () => {
    return document.getElementById(id);
  };

  return (
    <List.Item
      id={id}
      key="DueDateItem"
      actions={
        todo.dueDate && [
          <Button
            type="text"
            shape="circle"
            style={{
              padding: 0,
              height: 26,
              width: 26,
            }}
            onClick={handleCancelDueDate}
          >
            <CloseOutlined />
          </Button>,
        ]
      }
    >
      <Dropdown
        overlay={menu}
        placement="topLeft"
        arrow
        trigger={['click']}
        getPopupContainer={getRoot}
        onVisibleChange={setReminderTimes}
        overlayStyle={{ width: 252 }}
      >
        <List.Item.Meta
          avatar={<CalendarOutlined />}
          title={todo && getDueDateTitle(todo.dueDate)}
        />
      </Dropdown>
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

export default connect(mapStateToProps, mapDispatchToProps)(DueDateItem);
