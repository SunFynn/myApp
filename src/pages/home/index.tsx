import type { FC } from 'react';
import { useEffect, useCallback, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Input } from 'antd';
import { get, post } from '@/services/home';
import produce from 'immer';

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
      home页 - 123123213
      <Button type="primary" onClick={handleGet}>
        获取node服务器接口数据_get
      </Button>
      <Button type="primary" onClick={handlePost}>
        获取node服务器接口数据_post
      </Button>
      <p>ref的值：{num.current}</p>
      <Button onClick={handleRefBtnClick}>useRef的值+1</Button>
      {/* <div className={style.div1} />
      <div className={style.div2} /> */}
    </div>
  );
};

export default Home;
