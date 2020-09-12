import React, { useEffect, useState } from 'react';
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
import { WARNING_RED } from '../../../utils/constants';

const TIME_FORMAT = 'ddd';

function DueDateItem({ todo, updateTodo }) {
  const [dueToday, setDueToday] = useState(null);
  const [dueTomorrow, setDueTomorrow] = useState(null);
  const [dueNextWeek, setDueNextWeek] = useState(null);
  const [isOverdue, setIsOverdue] = useState(false);

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

  function dateDiff(now, due) {
    return Math.round(moment.duration(due.diff(now)).asDays());
  }

  function getRelativeDate(date, diff) {
    console.log('diff', diff);
    if (Math.abs(diff) > 1) return date.format('ddd, D MMMM');
    if (diff === 0) return 'Today';
    if (diff === -1) return 'Yesterday';
    return 'Tomorrow';
  }

  function getDueDateTitle(dueDate) {
    if (!dueDate) return 'Add Due Date';
    const due = moment.unix(dueDate.seconds).startOf('day');
    const now = moment().startOf('day');
    const overdueStyle = isOverdue ? { color: WARNING_RED } : {};
    const diff = dateDiff(now, due);
    return (
      <>
        <Typography.Text
          style={{ display: 'inline-block', width: 175, ...overdueStyle }}
        >
          {`Due ${getRelativeDate(due, diff)}`}
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

  useEffect(() => {
    if (!todo || !todo.dueDate) {
      setIsOverdue(false);
    } else {
      const due = moment.unix(todo.dueDate.seconds);
      const now = moment().startOf('day');
      setIsOverdue(dateDiff(now, due) < 0);
    }
  }, [todo]);

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
          avatar={
            <CalendarOutlined style={isOverdue ? { color: WARNING_RED } : {}} />
          }
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
