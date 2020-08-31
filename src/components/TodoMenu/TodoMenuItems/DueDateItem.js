import React from 'react';
import { List, Dropdown, Menu } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

export default function DueDateItem() {
  const id = 'due_date_item';

  const menu = (
    <Menu>
      <Menu.Item>Today</Menu.Item>
      <Menu.Item>Tomorrow</Menu.Item>
      <Menu.Item>Next Week</Menu.Item>
      <Menu.Divider />
      <Menu.Item>Pick a Date</Menu.Item>
    </Menu>
  );

  const getRoot = () => {
    return document.getElementById(id);
  };

  return (
    <List.Item id={id}>
      <Dropdown
        overlay={menu}
        placement="topLeft"
        arrow
        trigger={['click']}
        getPopupContainer={getRoot}
      >
        <List.Item.Meta avatar={<CalendarOutlined />} title="Add Due Date" />
      </Dropdown>
    </List.Item>
  );
}
