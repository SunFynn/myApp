import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import './style.less';

interface TestPageProps {}

const TestPage: FunctionComponent<TestPageProps> = () => {
  const [list, setList] = useState<any[]>([]);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    setList([
      { id: 1, title: 1, desc: '描述描述1111', flex: 2 },
      { id: 2, title: 2, desc: '描述描述2222', flex: 1 },
      { id: 3, title: 3, desc: '描述描述3333', flex: 1 },
      { id: 4, title: 4, desc: '描述描述4444', flex: 1 },
    ]);
  }, []);

  const handleItemClick = (num: number) => {
    setActive(num);
    console.log(num, '当前选中项')
  };

  return (
    <div className="Box">
      {list.map((item, idx) => {
        return (
          <div
            key={item.id}
            className="Item"
            onMouseEnter={() => {
              handleItemClick(idx);
            }}
            style={{ flex: idx === active ? 2 : 1 }}
          >
            {idx === active ? <div>{item.desc}</div> : <div>{item.title}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default TestPage;
