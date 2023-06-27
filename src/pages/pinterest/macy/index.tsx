import type { FunctionComponent } from 'react';
import { useLayoutEffect } from 'react';
import Macy from 'macy';
import styles from './style.less';

interface MacyBoxProps {
  list: { img: string; title: string; desction: string }[];
}

const MacyBox: FunctionComponent<MacyBoxProps> = (props) => {
  const { list = [] } = props;

  const InitMacy = () => {
    new Macy({
      container: '#macy-container',
      trueOrder: false,
      mobileFirst: true,
      waitForImages: false,
      margin: { x: 10, y: 10 },
      columns: 6, // 设置列数
    });
  };

  useLayoutEffect(() => {
    InitMacy();
  }, [list]);

  return (
    <div id="macy-container">
      {list.map((item, idx) => {
        return (
          <div key={idx} className={styles.cardBox}>
            <img src={item.img} alt={'图片丢失'} width={'100'} height={'60'} />
            <div>{item.title}</div>
            <p>{item.desction}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MacyBox;
