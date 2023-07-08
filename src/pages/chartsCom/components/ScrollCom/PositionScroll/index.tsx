import { useRef, useEffect, useState } from 'react';
import cs from 'classnames';
import styles from './index.less';

export interface ICostQantity {
  type: string;
  sales?: number;
  width?: string;
  sum?: string;
}

const TOTAL_WIDTH = 80;
class Percent {
  constructor(list: ICostQantity[]) {
    let max = 0;
    list.forEach((it) => {
      max = Math.max(max, it.sales || 0);
    });
    this.max = max;

    list.forEach((it) => {
      it.width = this.getWidth(it.sales || 0);
    });
  }

  max: number = 0;

  getWidth(value: number) {
    const ret = Math.round((value / this.max) * TOTAL_WIDTH) + '%';
    return ret;
  }
}

const mock: ICostQantity[] = [
  { type: '螺纹钢' },
  { type: '圆钢' },
  { type: '钢板' },
  { type: '水泥' },
  { type: '砌砖' },
  { type: '砌块' },
  { type: '黄砂' },
  { type: '碎石' },
  { type: '混砂浆' },
  { type: '瓷砖' },
  { type: '电线' },
];

const PositionScroll = () => {
  const [data, setData] = useState<ICostQantity[]>(mock);
  const [m] = useState(mock);

  const scrollItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = m.map((it: ICostQantity) => {
      const sales = Math.round(Math.random() * 10000 + Math.random() * 100);
      return { ...it, sales, sum: sales.toLocaleString() };
    });
    new Percent(list);
    setData([...list, ...list]);
    return () => {
      setData([]);
    };
  }, [m]);

  useEffect(() => {
    const item: any = scrollItem.current?.style;
    const interval = setInterval(() => {
      if (Math.abs(parseInt(item.top)) < 25 * (data.length / 2 - 1))
        item.top = `${parseInt(item.top) - 25}px`;
      else item.top = '0px';
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div className={styles['detail-cost-quantity']}>
      <div className={styles.header}>
        <div className={styles.subject} style={{ textAlign: 'center' }}>
          科目
        </div>
        <div className={styles.sum} style={{ textAlign: 'center' }}>
          合价(元)
        </div>
      </div>
      <div className={cs(styles.chart, styles['progress-scroll'])}>
        <div
          className={styles['progress-item']}
          ref={scrollItem}
          style={{ top: '0px', width: '100%' }}
        >
          {data.map((it: ICostQantity, idx: number) => (
            <div className={styles.row} key={`${it.type}-${idx}`}>
              <div className={styles.label}>{it.type}</div>
              <div className={styles.bar}>
                <div
                  className={cs(styles['bar-process'], { zero: !it.sales })}
                  style={{ width: it.width }}
                />
              </div>
              <div className={styles.quantity}>{it.sum}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PositionScroll;
