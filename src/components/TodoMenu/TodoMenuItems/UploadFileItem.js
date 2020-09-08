import React from 'react';
import { List, Upload } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';

export default function UploadFileItem() {
  return (
    <List.Item>
      <div style={{ overflow: 'hidden', marginLeft: -4 }}>
        <Upload multiple>
          <div style={{ marginLeft: 4 }}>
            <PaperClipOutlined style={{ marginRight: 16 }} />
            <h4 style={{ display: 'inline' }}>Add File</h4>
          </div>
        </Upload>
      </div>
    </List.Item>
  );
}
