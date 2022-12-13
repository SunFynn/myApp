import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import styles from './style.less';

interface DivBlockTwoProps {
  list: { img: string; title: string; desction: string }[];
}

const DivBlockTwo: FunctionComponent<DivBlockTwoProps> = (props) => {
  const { list: listP } = props;
  const [list, setList] = useState<any[]>([]);
  const [leftArr, setLeftArr] = useState<any[]>([]);
  const [rightArr, setRightArr] = useState<any[]>([]);

  useEffect(() => {
    setList(listP);
  }, [listP]);

  // 判断图片的加载情况
  function loadImagesFunc(imgs: any[]): Promise<any> {
    const urlArrsPromise = [...imgs].map((image) => {
      return new Promise((resolve, reject) => {
        image.onload = function () {
          resolve('image unloded');
        };
        image.onerror = function () {
          reject('image unloded error');
        };
        if (image.complete) {
          resolve('image has loded');
        }
      });
    });
    return Promise.allSettled(urlArrsPromise)
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const height = [0, 0];
    const allBox = document.getElementById('allBox');
    const cardBoxDivs = document.getElementsByClassName('cardBoxDiv');
    const imgs: any[] = allBox?.querySelectorAll('img') || [];
    loadImagesFunc(Array.from(imgs)).then(() => {
      const leftData = [];
      const rightData = [];
      // 不是真正的数组，不能使用map、forEach等便利方式
      for (let i = 0; i < cardBoxDivs.length; i++) {
        const h = (cardBoxDivs[i] as HTMLElement).offsetHeight;
        if (i === 0) {
          leftData.push(list[i]);
          height[0] += h;
        } else if (i === 1) {
          rightData.push(list[i]);
          height[1] += h;
        } else {
          if (height[0] > height[1]) {
            rightData.push(list[i]);
            height[1] += h;
          } else {
            leftData.push(list[i]);
            height[0] += h;
          }
        }
      }
      setLeftArr(leftData);
      setRightArr(rightData);
    });
  }, [list]);

  function random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // 随机图片
  const handleSearchImage = async () => {
    fetch('https://shibe.online/api/shibes?count=10&urls=true&httpsUrls=false')
      .then((res) => res.json())
      .then((res) => {
        const arr: any[] = [];
        res.forEach((item: string, i: number) => {
          const obj: any = {};
          // obj.img = `https://picsum.photos/640/200/?random=${random(1, 1000)}`;
          obj.img = `${item}`;
          obj.title = `${list.length + i}`;
          obj.desction = '随机随机';
          arr.push(obj);
        });
        console.log(arr, ' ---');
        setList((prev) => [...prev, ...arr]);
      });
  };

  // 随机生成文字
  const createRandomChinese = (count: number) => {
    const start = parseInt('4e00', 16);
    const end = parseInt('9fa5', 16);
    let name = '';
    for (let i = 0; i < count; i++) {
      const cha = Math.floor(Math.random() * (end - start));
      name += '\\u' + (start + cha).toString(16);
    }
    return eval(`'${name}'`);
  };

  const handleSearchText = async () => {
    fetch('https://mock.mengxuegu.com/mock/63899dbd93a67b5f1066906f/api/pinterest', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        const arr: any[] = [];
        data.forEach((item: any, i: number) => {
          const obj: any = {};
          // obj.img = `https://picsum.photos/640/200/?random=${random(1, 1000)}`;
          obj.img = `${item.img}`;
          obj.title = `${list.length + i}`;
          obj.desction = `${createRandomChinese(random(10, 500))}`;
          arr.push(obj);
        });
        console.log(arr, ' ---');
        setList((prev) => [...prev, ...arr]);
      });
  };

  return (
    <div className={styles.DivBlockTwo}>
      <div className={styles.hiddenBox} id="allBox">
        {list.map((item, idx) => {
          return (
            <div key={idx} className={`${styles.cardBox} cardBoxDiv`} style={{ width: '180px' }}>
              <img src={item.img} alt={'图片丢失'} width={'100%'} />
              <div>{item.title}</div>
              <p>{item.desction}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.mobileBox}>
        <div>
          {leftArr.map((item, idx) => {
            return (
              <div key={idx} className={`${styles.cardBox}`} style={{ width: '180px' }}>
                <img src={item?.img} alt={'图片丢失'} />
                <div>{item?.title}</div>
                <p>{item?.desction}</p>
              </div>
            );
          })}
        </div>
        <div>
          {rightArr.map((item, idx) => {
            return (
              <div key={idx} className={`${styles.cardBox}`} style={{ width: '180px' }}>
                <img src={item?.img} alt={'图片丢失'} />
                <div>{item?.title}</div>
                <p>{item?.desction}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => handleSearchText()} style={{ margin: '30px auto' }}>
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default DivBlockTwo;
