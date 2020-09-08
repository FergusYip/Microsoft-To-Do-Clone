import React from 'react';
import { Result, Spin } from 'antd';

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        backgroundSize: '100%',
        backgroundAttachment: 'fixed',
      }}
    >
      <section
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          textAlign: 'center',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Result icon={<Spin size="large" />} />
      </section>
    </div>
  );
}
