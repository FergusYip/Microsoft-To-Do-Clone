import React from 'react';
import { Menu, Dropdown, Calendar } from 'antd';

const contextMenu = (
  <Menu mode="vertical">
    <Menu.Item>Add to My Day</Menu.Item>
    <Menu.Item>Mark as Important</Menu.Item>
    <Menu.Item>Mark as Completed</Menu.Item>
    <Menu.Divider />
    <Menu.Item>Due Today</Menu.Item>
    <Menu.Item>Due Tomorrow</Menu.Item>
    {/* <Menu.Item>Pick a Date</Menu.Item> */}
    <Menu.SubMenu title="Pick a Date">
      <Menu.Item style={{ width: 300 }} disabled>
        <Calendar fullscreen={false} />
      </Menu.Item>
    </Menu.SubMenu>
    <Menu.Divider />
    <Menu.Item>Create a New list from This Task</Menu.Item>
    <Menu.Item>Move Task to...</Menu.Item>
    <Menu.Divider />
    <Menu.Item>Delete Task</Menu.Item>
  </Menu>
);

const TodoItemContextMenu = ({ children }) => {
  return (
    <Dropdown overlay={contextMenu} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  );
};

export default TodoItemContextMenu;
