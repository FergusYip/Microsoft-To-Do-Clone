import React from 'react';
import { List } from 'antd';
import StepItem from './StepItem';

export default function StepList({ steps, onRemove, onUpdate }) {
  return (
    steps.length !== 0 && (
      <List
        bordered={false}
        dataSource={steps}
        renderItem={(step) => (
          <StepItem step={step} onUpdate={onUpdate} onRemove={onRemove} />
        )}
      />
    )
  );
}
