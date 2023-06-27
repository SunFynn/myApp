import type { FC } from 'react';
import { useCallback } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import produce from 'immer';
import { get, post } from '@/services/home';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  // get请求
  const handleGet = useCallback(() => {
    get({}).then((res) => {
      if (res.data) {
        console.log(res);
      }
    });
  }, []);

  // post请求
  const handlePost = useCallback(() => {
    post({}).then((res) => {
      console.log(res);
    });
  }, []);

  const baseState = [
    {
      title: 'Learn TypeScript',
      done: true,
    },
    {
      title: 'Try Immer',
      done: false,
    },
  ];

  const nextState = baseState.slice(); // 数组截取，返回新的数组
  nextState[1] = {
    ...nextState[1],
    done: true,
  };
  nextState.push({ title: 'Tweet about it', done: false });
  console.log(baseState, nextState, baseState === nextState, '123123123');

  const obj = [
    {
      title: 'Learn TypeScript',
      done: true,
    },
    {
      title: 'Try Immer',
      done: false,
    },
  ];

  const nextObj = produce(obj, (draft) => {
    draft[1].done = true;
    draft.push({ title: 'Tweet about it', done: false });
  });

  console.log(nextObj, obj === nextObj, '------------');

  return (
    <PageContainer title="首页">
      <Button type="primary" onClick={handleGet} style={{ marginRight: '16px' }}>
        获取node服务器接口数据_get
      </Button>
      <Button type="primary" onClick={handlePost}>
        获取node服务器接口数据_post
      </Button>
    </PageContainer>
  );
};

export default Home;
