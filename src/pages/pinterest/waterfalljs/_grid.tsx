import { useState, useEffect, useRef } from 'react';
import type { FunctionComponent } from 'react';
import Waterfall from '@/components/Waterfall/react';
import styles from './style.less';

interface WaterFallGridBoxProps {
  list: { img: string; title: string; desction: string }[];
}

const defimages = [
  'https://picsum.photos/640/200/?random',
  'https://picsum.photos/360/640/?random',
  'https://picsum.photos/480/720/?random',
  'https://picsum.photos/480/640/?random',
  'https://picsum.photos/360/?random',
  'https://picsum.photos/360/520/?random',
  'https://picsum.photos/520/360/?random',
  'https://picsum.photos/520/360/?random',
  'https://picsum.photos/520/360/?random',
  'https://picsum.photos/720/640/?random',
];

const customStyleGrid = `#react-waterfall-grid-comps li>div {
  border-radius: 8px;
  font-size: 12px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.6);
  padding: 6px;
  background: rgb(255, 255, 255);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s
}
#react-waterfall-grid-comps li>div:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
  transition: all 0.3s
}
#react-waterfall-grid-comps li>div>img {
  width: 100%
}`;

const WaterFallGridBox: FunctionComponent<WaterFallGridBoxProps> = (props) => {
  const { list } = props;
  const [images, setImages] = useState<any[]>([]);
  const ulMaxHRef = useRef(0);

  useEffect(() => {
    setImages(list);
  }, [list]);

  const handleSearchImage = async () => {
    function random(min: number, max: number) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }
    const arr: any[] = [];
    for (let i = 0; i < 9; i++) {
      const obj: any = {};
      obj.img = `${defimages[i]}=${random(1, 10000)}`;
      obj.title = `${images.length + i + 1}`;
      obj.desction = '随机随机';
      arr.push(obj);
    }
    setImages((prev) => [...prev, ...arr]);
  };
  return (
    <div onScroll={() => {}}>
      <h3 style={{ textAlign: 'center' }}>grid渲染</h3>
      <Waterfall
        mode="grid"
        el="#react-waterfall-grid-comps"
        columnWidth={230}
        columnCount={3}
        columnGap={24}
        rowGap={28}
        customStyle={customStyleGrid}
        onChangeUlMaxH={(h) => (ulMaxHRef.current = h)}
      >
        {images.map((item) => {
          return (
            <li key={item.title} className={styles.cardBox}>
              <div>
                <img src={item.img} alt={'图片丢失'} />
                <div>{item.title}</div>
                <p>{item.desction}</p>
              </div>
            </li>
          );
        })}
      </Waterfall>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => handleSearchImage()} style={{ margin: '30px auto' }}>
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default WaterFallGridBox;
