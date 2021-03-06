import React, { useState } from 'react';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history } from 'umi';
import Footer from '@/components/Footer';
import { connect } from 'dva';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

export interface LoginProps {
  dispatch?: any;
}

const Login: React.FC<LoginProps> = (props) => {
  const { dispatch } = props;
  const [userLoginState, setUserLoginState] = useState<any>({});
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: any) => {
    try {
      // 登录
      let msg;
      if (
        type === 'account' &&
        ['admin', 'user'].includes(values.username || '') &&
        values.password === '121828'
      ) {
        msg = { status: 'ok', type: 'account', currentAuthority: values.username };
        dispatch({
          type: 'user/fetch',
          payload: { name: values.username },
        });
        dispatch({
          type: 'user/fetchCurrent',
          payload: { name: values.username },
        });
        dispatch({
          type: 'user/saveCurrentUser',
          payload: { msg: '直接调用reducer中的函数' },
        });
      } else if (type === 'mobile' && values.captcha === '121828') {
        msg = { status: 'ok', type: 'mobile', currentAuthority: values.mobile };
      } else if (type === 'account') {
        msg = { status: 'error', type: 'account' };
      } else {
        msg = { status: 'error', type: 'mobile' };
      }
      if (msg.status === 'ok') {
        const obj = {
          data: { username: values.username },
          time: Date.now(),
          storageTime: 10 * 60 * 1000,
        };
        localStorage.setItem('isLogin', JSON.stringify(obj));
        message.success('登录成功');
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/home');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          // logo={<img alt="logo" src="" />}
          title="个人技术文档"
          subTitle={'wtz的个人技术文档'}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            '其他登录方式',
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码登录'} />
            <Tabs.TabPane key="mobile" tab={'手机号登录'} />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'账户或密码错误'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                // placeholder={'密码: 123456'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} '获取验证码'`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功!');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default connect()(Login);
