import type { FC } from 'react';
import { useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { get, post } from '@/services/home';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  useEffect(() => {});

  const handleGet = useCallback(() => {
    console.log(123213);
    get({}).then((res) => {
      if (res.data) {
        console.log(res);
      }
    });
  }, []);

  const handlePost = useCallback(() => {
    post({}).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      home页
      <Button type="primary" onClick={handleGet}>
        获取node服务器接口数据_get
      </Button>
      <Button type="primary" onClick={handlePost}>
        获取node服务器接口数据_post
      </Button>
    </div>
  );
};

export default Home;
