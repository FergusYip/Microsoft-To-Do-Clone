import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { PageHeader, Menu, Typography, Dropdown, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

function SidebarHeader({ signOut, profile }) {
  const avatarMenu = (
    <Menu>
      <Menu.Item key="0" onClick={signOut}>
        Sign out
      </Menu.Item>
    </Menu>
  );

  return (
    <PageHeader
      title={
        <Row align="middle">
          <Dropdown overlay={avatarMenu} trigger={['click']}>
            {/* <Avatar icon={<UserOutlined />} /> */}
            <Avatar>
              {profile.isLoaded
                ? profile.name
                    .split(/\s+/)
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase()
                : ''}
            </Avatar>
          </Dropdown>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Todo
          </Typography.Title>
        </Row>
      }
      backIcon={false}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
