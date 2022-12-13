import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import CSSColumn from './css_column';
import Macy from './macy';
import Waterfall from './waterfalljs';
import DivBlockTwo from './DivBlockTwo';
import { getPinterestList } from '@/services/pinterest';
import styles from './style.less';

/** 交叉瀑布流 */
interface PinterestProps {}

const Pinterest: FunctionComponent<PinterestProps> = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getPinterestList().then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <PageContainer>
      <Card className={styles.Pinterest}>
        <h3>交叉瀑布流的实现方式</h3>
        <div>
          语雀文章地址：
          <a
            href="https://www.yuque.com/u1448344/ieyoyi/girv02vbnm7387ut"
            target="_blank"
            rel="noreferrer"
          >
            https://www.yuque.com/u1448344/ieyoyi/girv02vbnm7387ut
          </a>
        </div>
        <ul>
          <li>1、css实现：column、grid</li>
          <li>
            2、使用组件库
            <ul>
              <li>
                2-1、mary库 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://github.com/bigbite/macy.js" target="_blank" rel="noreferrer">
                  https://github.com/bigbite/macy.js
                </a>
              </li>
              <li>
                2-2、waterfalljs-layout库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="https://github.com/hugeorange/waterfalljs"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/hugeorange/waterfalljs
                </a>
              </li>
            </ul>
          </li>
          <li>
            3、js手动实现
            <ul>
              <li>
                3-1、图片渲染之前得知图片的宽高，
                左右两个div，图片的url上包含当前图片的高度，通过计算高度，往较小高度的div添加图片，实现交叉瀑布流
              </li>
              <li>
                3-2、渲染前不知道图片及内容的宽高，先全部遍历的所有的列表内容，获取内容的高度，然后往较小高度div中添加元素，实现交叉瀑布流
              </li>
              <li>3-3、IntersectionObserver(交叉观察器)</li>
            </ul>
          </li>
        </ul>
      </Card>
      <Card>
        <Tabs defaultActiveKey="4">
          <Tabs.TabPane tab="css_module" key="1">
            <CSSColumn list={list} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="2-1 macy库" key="2">
            <Macy list={list} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="2-2 waterfalljs-layout库" key={'3'}>
            <Waterfall list={list} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="3-2 分列展示" key={'4'}>
            <DivBlockTwo list={list} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Pinterest;
