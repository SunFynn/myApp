import React, { useMemo } from 'react';
import { Card } from 'antd';
import { EllipsisSpan, Copy, BaseDescriptions, DragIcon } from '@weblife-wei/web_design/src';
import { PageContainer } from '@ant-design/pro-layout';

const Design: React.FC = () => {
  const descriptions = useMemo(() => {
    return [
      {
        title: '模块信息1',
        list: [
          { label: 'label 1-1', key: 'content1_1' },
          {
            label: 'label 1-2',
            key: 'content1_2',
            render: (v: any) => (
              <div
                title={v}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                {v}
              </div>
            ),
          },
          { label: 'label 1-3', key: 'content1_3' },
        ],
      },
      {
        title: '模块信息2',
        list: [
          { label: 'label 2-1', key: 'content2_1' },
          { label: 'label 2-2', key: 'content2_2' },
          { label: 'label 2-3', key: 'content2_3' },
          { label: 'label 2-4', key: 'content2_4' },
        ],
      },
    ];
  }, []);
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
      <Card title={'Copy组件'} style={{ marginTop: '16px' }}>
        <Copy value={'盼望着，盼望着，春天来了'} id={'copy1'}>
          复制
        </Copy>
      </Card>
      <Card title={'BaseDescriptions组件'} style={{ marginTop: '16px' }}>
        <BaseDescriptions dataSource={{}} descriptions={descriptions} />
      </Card>
    </PageContainer>
  );
};

export default Design;
