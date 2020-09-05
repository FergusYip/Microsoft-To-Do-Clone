import React, { useEffect, useState } from 'react';
import { List, Checkbox, Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function StepItem({ step, onUpdate, onRemove }) {
  const [editingTitle, setEditingTitle] = useState(false);

  function handleOnChange(e) {
    onUpdate({ ...step, isComplete: e.target.checked });
  }

  function handleRemove() {
    onRemove(step);
  }

  function handleRename(e) {
    e.preventDefault();
    document.activeElement.blur();
    setEditingTitle(false);
    const newTitle = e.target.value.trim();
    if (newTitle && newTitle !== step.title) {
      onUpdate({ ...step, title: newTitle });
    }
  }

  const handleTitleFocus = () => setEditingTitle(true);

  return (
    <List.Item
      actions={
        editingTitle
          ? []
          : [
              <Button
                type="text"
                shape="circle"
                onClick={handleRemove}
                style={{ padding: 0, height: 26, width: 26 }}
              >
                <CloseOutlined />
              </Button>,
            ]
      }
    >
      <List.Item.Meta
        avatar={
          <Checkbox checked={step.isComplete} onChange={handleOnChange} />
        }
        title={
          <Input.TextArea
            className="ant-typography"
            bordered={false}
            defaultValue={step.title}
            style={{
              padding: 0,
              color: 'rgba(0, 0, 0, 0.85)',
              fontSize: 14,
              lineHeight: '1.5715',
              resize: 'none',
            }}
            autoSize={{ minRows: 1 }}
            maxLength={100}
            onPressEnter={handleRename}
            onBlur={handleRename}
            onFocus={handleTitleFocus}
          />
        }
      ></List.Item.Meta>
    </List.Item>
  );
}
