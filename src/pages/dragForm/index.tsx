import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Left from "./Left";
import Content from "./Content";
import Right from "./Right";
import styles from './style.less';

function DragForm() {
  const [ItemData, setItemData] = useState([]);
  const [activeItem, setActiveItem] = useState({});

  useEffect(()=>{
    setItemData(JSON.parse(localStorage.getItem('formStorage') || '[]'));
  }, [])

  return (
    <PageContainer title="低代码拖拽表单">
      <div className={styles.dragForm}>
        <div className={styles.left}>
          <Left />
        </div>
        <div className={styles.content}>
          <Content 
            ItemData={ItemData} 
            setItemData={setItemData} 
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>
        <div className={styles.right}>
          <Right
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            ItemData={ItemData}
            setItemData={setItemData} 
          />
        </div>
      </div>
    </PageContainer>
  );
}

export default DragForm;
