import React, { useEffect, useState } from 'react';
import { List, Checkbox, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function StepItem({ step, modifyStep, onRemove }) {
  const [isComplete, setIsComplete] = useState();

  useEffect(() => {
    setIsComplete(step.isComplete);
  }, [step]);

  function onChange(e) {
    const newIsComplete = e.target.checked;
    setIsComplete(newIsComplete);

    const modifiedStep = { ...step };
    modifiedStep.isComplete = newIsComplete;
    modifyStep(modifiedStep);
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
        avatar={<Checkbox checked={isComplete} onChange={onChange} />}
        title={step.title}
      ></List.Item.Meta>
    </List.Item>
  );
}
