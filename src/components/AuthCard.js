import React from 'react';
import { Layout, Row, Col, Typography, Card, Divider } from 'antd';
const { Content } = Layout;

export default function AuthCard({ title, children }) {
  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Row justify="center" style={{ width: '100%' }}>
          <Col xl={12} lg={12} md={12} sm={16} xs={20}>
            <Card>
              <Typography.Title>{title}</Typography.Title>
              <Divider />
              {children}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
