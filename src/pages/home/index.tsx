import type { FC } from 'react';
import { useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { get, post } from '@/services/home';
import produce from 'immer';

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
