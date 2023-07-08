import type { FC } from 'react';
import { useEffect, useCallback, useRef, useState } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import produce from 'immer';
import { get, post } from '@/services/home';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const num = useRef<number>(0);

  const handleRefBtnClick = () => {
    num.current++;
    console.log(num.current, 'ref绑定的值');
  };

  useEffect(() => {
    console.log(`监听ref的变化${num.current}`);
  }, [num.current]);

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
      <p>ref的值：{num.current}</p>
      <Button onClick={handleRefBtnClick}>useRef的值+1</Button>
    </PageContainer>
  );
};

export default Home;
