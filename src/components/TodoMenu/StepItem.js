import React, { useEffect } from 'react';
import { List, Checkbox, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function StepItem({ step, onUpdate, onRemove }) {
  function handleOnChange(e) {
    onUpdate({ ...step, isComplete: e.target.checked });
  }

  function handleRemove() {
    onRemove(step);
  }

  return (
    <List.Item
      actions={[
        <Button type="text" shape="circle" onClick={handleRemove}>
          <CloseOutlined style={{ fontSize: 12 }} />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Checkbox checked={step.isComplete} onChange={handleOnChange} />
        }
        title={step.title}
      ></List.Item.Meta>
    </List.Item>
  );
}
