import React from 'react';
import { List } from 'antd';
import StepItem from './StepItem';

export default function StepList({ steps, modifyStep }) {
  return (
    steps.length !== 0 && (
      <List
        bordered={false}
        dataSource={steps}
        key={(step) => step.id}
        renderItem={(step) => <StepItem step={step} modifyStep={modifyStep} />}
      />
    )
  );
}
