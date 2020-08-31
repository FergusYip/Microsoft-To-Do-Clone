import React from 'react';
import { List, Dropdown, Menu } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';

export default function RepeatItem() {
  const id = 'repeat_item';

  const menu = (
    <Menu>
      <Menu.Item>Daily</Menu.Item>
      <Menu.Item>Weekly</Menu.Item>
      <Menu.Item>Weekdays</Menu.Item>
      <Menu.Item>Monthly</Menu.Item>
      <Menu.Item>Yearly</Menu.Item>
      <Menu.Divider />
      <Menu.Item>Custom</Menu.Item>
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
        <List.Item.Meta avatar={<RetweetOutlined />} title="Repeat" />
      </Dropdown>
    </List.Item>
  );
}
