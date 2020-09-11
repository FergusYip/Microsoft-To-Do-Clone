import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';

export default function AvatarToggle({
  text,
  value = false,
  onChange = () => {},
}) {
  const [internalChecked, setInternalChecked] = useState(null);

  useEffect(() => {
    setInternalChecked(value);
  }, [value]);

  function toggleChecked() {
    setInternalChecked((isChecked) => !isChecked);
    onChange(!internalChecked);
  }

  return (
    <div onClick={toggleChecked}>
      {internalChecked ? (
        <Avatar size={40} style={{ fontSize: 16, backgroundColor: '#1890ff' }}>
          {text.substr(0, 2)}
        </Avatar>
      ) : (
        <Avatar size={40} style={{ fontSize: 16 }}>
          {text.substr(0, 2)}
        </Avatar>
      )}
    </div>
  );
}
