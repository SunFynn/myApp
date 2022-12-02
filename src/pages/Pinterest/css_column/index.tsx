import type { FunctionComponent } from 'react';
import styles from './style.less';

interface CssColumnProps {
  list: { img: string; title: string; desction: string }[];
}

const CssColumn: FunctionComponent<CssColumnProps> = (props) => {
  const { list = [] } = props;
  return (
    <div className={styles.box}>
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

export default CssColumn;
