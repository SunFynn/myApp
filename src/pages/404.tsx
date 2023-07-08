import { Button, Result } from 'antd';
import { history, useLocation } from 'umi';

const NoFoundPage: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/') history.push('/home');
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，当前页面丢失了"
      extra={
        <Button type="primary" onClick={() => history.push('/home')}>
          回到首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
