import { useMemo, useEffect, useState, useRef } from 'react';
import cs from 'classnames';
// func
import { ellipsisSpan } from '@/utils';
// typescript
import type { FunctionComponent } from 'react';
// less
import styles from './style.less';

type progressObj = {
  title: string; // 名称
  value: number; // 数值
  color?: string; // 进度条颜色
  unit?: string; // 单位
};

interface ProgressProps {
  data: progressObj[];
  color?: string; // 进度条颜色
  numColor?: string; // 数字颜色
  bgColor?: string; // 进度条背景颜色
  align?: string; // 数字的展示位置，不填写：进度条右侧； top：进度条上侧
  rainbow?: boolean; // 进度条颜色是否使用彩虹颜色
  progressWidth?: number; // 进度条的宽度
}

/**
 * 大屏组件-进度条组件【无滚动样式】
 */
const Progress: FunctionComponent<ProgressProps> = (props) => {
  const {
    data: dataP,
    color = 'linear-gradient(90deg,rgba(22,86,126,0.70), #6ac4ff)',
    numColor = '#6ac4ff',
    bgColor = 'rgba(177,210,255,0.1)',
    align,
    rainbow,
    progressWidth = 80,
  } = props;
  const [data, setData] = useState<progressObj[]>([]);
  const ref = useRef<any>();

  useEffect(() => {
    setData([...dataP]);
    return () => {
      setData([]);
    };
  }, [dataP]);

  // 找出当前数据中最大的数值，用作进度条占比使用
  const maxNum = useMemo(() => {
    const path: number[] = [];
    (data || []).forEach((item) => {
      path.push(item.value);
    });
    return Math.max(...path);
  }, [data]);

  const ProgressData: progressObj[] = useMemo(() => {
    let d: progressObj[] = [...(data || [])];
    const rainbowColor = [
      'linear-gradient(90deg,#5e1919, #f04545)',
      'linear-gradient(90deg,#726126, #ffcc00)',
      'linear-gradient(90deg,#3b2b87, #6648ff)',
      'linear-gradient(90deg,#1d6c9e, #6ac4ff)',
      'linear-gradient(90deg,#1d6c9e, #6ac4ff)',
    ];
    if (rainbow) {
      d = (data || []).map((item: any, idx) => {
        item.color = rainbowColor[idx];
        return item;
      });
    }
    return d;
  }, [data, rainbow]);

  useEffect(() => {
    let count = 0;
    let interval: any;
    if (ProgressData.length > 6) {
      ref.current.style.transform = `translate(0, 0)`;
      interval = setInterval(() => {
        if (count === 0) {
          ref.current.style.transition = 'transform 1s';
        }
        ref.current.style.transform = `translate(0, -${++count * 32}px)`;
        if (count === ProgressData.length) {
          ref.current.style.transition = 'width 1s';
          setTimeout(() => {
            ref.current.style.transform = `translate(0, 0)`;
            count = 0;
          });
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [ProgressData]);

  return (
    <div className={cs(styles.progress)} style={{ overflow: 'hidden', height: '184px' }}>
      <div className={cs(styles['progress-box'])} ref={ref}>
        {(ProgressData.length > 6 ? [...ProgressData, ...ProgressData] : ProgressData).map(
          (item, idx) => {
            return (
              <div
                key={`${idx}_${item.value}`}
                style={{
                  overflow: 'hidden',
                  paddingLeft: '4px',
                  display: 'flex',
                  marginBottom: '10px',
                }}
              >
                <div
                  className={cs(styles['progress-name'], styles[`${!idx && 'first-p'}`])}
                  style={{ width: '80px' }}
                >
                  <div>{ellipsisSpan(item.title, 80, 14)}</div>
                </div>
                <div style={{ position: 'relative', top: '-3px', width: '100%' }}>
                  <span
                    className={styles['progress-bg-width']}
                    style={{
                      width: `${align === 'top' ? 100 : progressWidth}%`,
                      background: `${bgColor}`,
                    }}
                  >
                    <span
                      className={styles[`progress-width`]}
                      style={{
                        width: `${
                          align === 'top' ? (item.value / maxNum) * 90 : (item.value / maxNum) * 80
                        }%`,
                        background: `${item.color || color}`,
                      }}
                    />
                  </span>
                  <span
                    className={cs(
                      styles['progress-num'],
                      styles[`${align === 'top' ? 'progress-right' : ''}`],
                    )}
                    style={{ position: 'absolute', [`${align}`]: '-18px', color: `${numColor}` }}
                  >
                    {item.value}
                    {item.unit}
                  </span>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default Progress;
