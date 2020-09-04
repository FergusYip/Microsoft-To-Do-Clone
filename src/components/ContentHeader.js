import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, PageHeader, Input } from 'antd';

const ContentHeader = ({
  title,
  isRenaming,
  onRenamed,
  onCancel,
  children,
}) => {
  function handleKeyDown(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      onCancel();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
  }, []);

  const confirmRename = (e) => {
    onRenamed(e.target.value);
  };

  return (
    <PageHeader
      title={
        isRenaming ? (
          <Input
            className="ant-typography"
            bordered={false}
            defaultValue={title}
            onPressEnter={confirmRename}
            autoFocus
            style={{
              marginBottom: '0.5em',
              color: 'rgba(0, 0, 0, 0.85)',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: 1.35,
              padding: 0,
            }}
            onBlur={onCancel}
          />
        ) : (
          <Typography.Title level={3}>{title}</Typography.Title>
        )
      }
      extra={children}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader);
