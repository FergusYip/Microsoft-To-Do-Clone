import React from 'react';
import { List } from 'antd';

export default function TodoMenuItem({ title, avatar, ...props }) {
  return (
    <List.Item {...props}>
      <List.Item.Meta avatar={avatar} title={title} />
    </List.Item>
  );
}
