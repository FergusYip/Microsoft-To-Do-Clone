import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, PageHeader, Input } from 'antd';

const ContentHeader = ({
  title,
  isRenaming,
  children,
  onRenamed = () => {},
  onCancel = () => {},
  content,
}) => {
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.key === 'Escape' || event.keyCode === 27) && isRenaming) {
        onCancel();
      }
    }
    document.addEventListener('keydown', handleKeyDown, false);
  }, [onCancel]);

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
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: 1.35,
              padding: 0,
            }}
            onBlur={onCancel}
          />
        ) : (
          <Typography.Title level={3} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        )
      }
      extra={children}
      style={{ height: 85 }}
    >
      {content}
    </PageHeader>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader);
