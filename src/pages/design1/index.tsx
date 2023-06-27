import React from 'react';
import { Card } from 'antd';
import { EllipsisSpan } from '@weblife-wei/web_design/src';
import { PageContainer } from '@ant-design/pro-layout';

const Design: React.FC = () => {
  return (
    <PageContainer title="个人前端组件库">
      <p>
        跳转到我的前端组件库 ：{' '}
        <a href="http://www.wtz-lmm.cn/design/#/" target="_blank" rel="noreferrer">
          http://www.wtz-lmm.cn/design/#/
        </a>
      </p>
      <Card title={'EllipsisSpan组件'}>
        <EllipsisSpan value={'盼望着，盼望着，春天来了'} width={100} />
        <EllipsisSpan value={'盼望着，盼望着，春天来了'} width={180} />
      </Card>
    </PageContainer>
  );
};

export default Design;
