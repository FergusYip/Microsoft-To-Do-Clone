import React from 'react';
import { List, Button, Typography } from 'antd';
import { CoffeeOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateTodo } from '../../../store/actions/todoActions';
import { CONFIRM_BLUE } from '../../../utils/constants';

function MyDayItem({ todo, updateTodo }) {
  const todayIsMyDay =
    todo &&
    todo.myDay &&
    moment().isSame(moment.unix(todo.myDay.seconds), 'day');

  function updateMyDay() {
    if (todayIsMyDay) {
      updateTodo({ ...todo, myDay: null });
    } else {
      const today = moment().startOf('day').toDate();
      updateTodo({ ...todo, myDay: today });
    }
  }

  return todayIsMyDay ? (
    //  Change color to match theme
    <List.Item
      key="MyDayItem"
      onClick={updateMyDay}
      actions={[
        <Button
          type="text"
          shape="circle"
          style={{ padding: 0, height: 26, width: 26 }}
        >
          <CloseOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<CoffeeOutlined style={{ color: CONFIRM_BLUE }} />}
        title={
          <Typography.Text style={{ color: CONFIRM_BLUE }}>
            Added to My Day
          </Typography.Text>
        }
      />
    </List.Item>
  ) : (
    <List.Item key="MyDayItem" onClick={updateMyDay}>
      <List.Item.Meta avatar={<CoffeeOutlined />} title={'Add to My Day'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyDayItem);
