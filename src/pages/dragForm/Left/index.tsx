import { FunctionComponent } from "react";
import { Tag } from 'antd';
import { ReactSortable } from 'react-sortablejs';
import { formItemData } from "../config";
import styles from "./style.less";

interface LeftProps {
  
}
 
const Left: FunctionComponent<LeftProps> = () => {
  return ( 
    <div className={styles.LeftBox}>
      <h3>配置组件</h3>
      <ReactSortable
        sort={false}
        group={{
          name: 'fieldLeftContainer',
          pull: 'clone',
          put: false
        }}
        list={formItemData}
        setList={()=>{}}
      >
        {
          formItemData.map(item => (
            <div 
              data-id={item.name} 
              key={item.name} 
              style={{ marginTop: 10 }}
              className={styles.tag}
            >
              <Tag>{item.label + '-' + item.name}</Tag>
            </div>
          ))
        }
      </ReactSortable>
    </div> 
  );
}
 
export default Left;