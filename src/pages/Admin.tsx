import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Admin: React.FC = () => {
  return (
    <PageHeaderWrapper content={'这个页面只有 admin 权限才能查看'}>
      <Card>
        <Alert
          message={'更快更强的重型组件，已经发布。'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Admin;
