import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import { connect } from 'dva';
import type { ConnectState } from '@/models/connect';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

type GlobalHeaderRightProps = ConnectState;

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = (props) => {
  return (
    <Space className={styles.right}>
      <Avatar menu={true} />
      <span style={{ color: '#ffffff' }}>{props.user.userUtils || ''}</span>
    </Space>
  );
};
export default connect(({ user }: ConnectState) => {
  return {
    user,
  };
})(GlobalHeaderRight);
