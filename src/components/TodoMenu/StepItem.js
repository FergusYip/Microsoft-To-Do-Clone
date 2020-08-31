import React, { useEffect, useState } from 'react';
import { List, Checkbox } from 'antd';

export default function StepItem({ step, modifyStep }) {
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

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Checkbox checked={isComplete} onChange={onChange} />}
        title={step.title}
      ></List.Item.Meta>
    </List.Item>
  );
}
