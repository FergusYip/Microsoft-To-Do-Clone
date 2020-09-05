import React, { useState } from 'react';
import { Modal, List, Checkbox, Button, Input } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

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

  function shortenTitle(title) {
    if (title.length > 20) {
      return `${title.substr(0, 20)}...`;
    }
    return title;
  }
  function showDeleteConfirm() {
    confirm({
      title: `“${shortenTitle(step.title)}” will be permanently deleted.`,
      icon: <ExclamationCircleOutlined />,
      content: "You won't be able to undo this action.",
      okText: 'Delete step',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleRemove();
      },
      onCancel() {},
    });
  }

  return (
    <List.Item
      actions={
        editingTitle
          ? []
          : [
              <Button
                type="text"
                shape="circle"
                onClick={showDeleteConfirm}
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
