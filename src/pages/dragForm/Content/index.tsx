import { FunctionComponent, useCallback } from "react";
import { Select } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { ReactSortable } from 'react-sortablejs';
import { cloneDeep } from "lodash";
import cs from "classnames";
import type { fieldItem } from "../config";
import { GlobalComponent } from "../config";
import styles from "./style.less";

interface ContentProps {
  ItemData: any[];
  setItemData: Function;
  activeItem: any;
  setActiveItem: Function;
}
 
const Content: FunctionComponent<ContentProps> = (props) => {
  const { ItemData, setItemData, activeItem, setActiveItem } = props;

  // 递归生成元素组件
  const loop = (fields: any[]|undefined, index: string) => {
    if(!fields || !Array.isArray(fields)) return null;
    else if(Array.isArray(fields) && !fields.length) return null;
    return (
      fields.map((item:fieldItem, i:number) => {
        const indexs = index === '' ? String(i) : `${index}-${i}`;
        if(item){
          // 容器组件
          if(item.name === 'Containers'){
            return(
              <div className={styles.formContainers}>
                <CloseCircleOutlined className={styles.deleteIcon} onClick={()=>{ fields.splice(i, 1); setItemData(cloneDeep(ItemData)) }} />
                {renderContainersComponents(item, indexs)}
              </div>
            )
          }
          const ComponentInfo = GlobalComponent?.[item.name];
          return (
            <div
              data-id={indexs} 
              key={item.cellId}
              className={cs(styles.formItemStyle, activeItem.cellId === item.cellId ? styles.activeFormItem : '')}
              onClick={()=>{
                setActiveItem(item);
              }}
            >
              <CloseCircleOutlined className={styles.deleteIcon} onClick={()=>{ fields.splice(i, 1); setItemData(cloneDeep(ItemData)) }} />
              { 
                item.name !== 'Divider' && <div className={styles.formItemLabel}>{item.label}</div> 
              }
              <div style={{flex: 1}}>
                { 
                  renderDiffComponents(item, indexs, ComponentInfo) 
                }
              </div>   
            </div>
          )
        } else {
          return null;
        }
      })
    )
  };

  /**
   * 渲染组件 [除容器外其他组件]
   * @param field  组件配置信息
   * @param indexs  唯一标识key
   * @param ComponentInfo  antd中对应的组件
   * @returns Component
  */ 
  const renderDiffComponents = (field:fieldItem, indexs:string, ComponentInfo:any) => {
    switch (field.name) {
      case 'Divider':  // 分割线
        return <ComponentInfo key={indexs} {...field.attr}></ComponentInfo>
      case 'Select':   // 多选框
        return (
          <ComponentInfo key={indexs} {...field.attr}>
            {
              (field.attr.options || []).map((subItem:any) => (
                <Select.Option 
                  key={subItem.key} 
                  value={subItem.value + ''}
                >
                    { subItem.label }
                </Select.Option>
              ))
            }
          </ComponentInfo>
        )
      default:
        return <ComponentInfo key={indexs} {...field.attr} />
    }
  }

  /**
   * 渲染组件  容器组件
   * @param field  组件配置信息
   * @param indexs  唯一标识key
  */
  const renderContainersComponents = (field:fieldItem, indexs:string)=>{
    return (
      <ReactSortable
        fallbackOnBody
        animation={150}
        group={{
          name: 'fieldItemContainer',
          pull: true,
          put: true,
        }}
        sort={true}
        scroll={true}
        id={field.cellId}
        className={styles.Containers}
        key={field.cellId}
        data-id={indexs} 
        list={field.children || []}
        setList={(s, i) => handleContainerSetList(s, i, field)}
        // onAdd={handleChildSortableAdd}
        {...field.attr}
      >
        { loop(field.children, indexs) }
      </ReactSortable>
    )
  }

  /** 容器内元素拖拽 */
  const handleContainerSetList = (list:any[], i:any, field: any)=>{
    const childrenList = cloneDeep(list);
    let newChildrenList = childrenList.map((field:any)=>{
      if(field.name === 'Containers' && !field.children) field.children = [];
      if(field.cellId) return field;
      field.cellId = `${field.name}-${new Date().getTime()}-${Math.floor(Math.random()*1000)}`;
      return field;
    });
    field.children = cloneDeep(newChildrenList)
    setItemData(cloneDeep(ItemData));
  }

  /** 排序 */
  const handleSortableSetList = (list:any[], s:any, d:any)=>{
    console.log(list, s, d, '88888888');
    // 需要深拷贝一下，不然拖拽相同组件，给对应item添加cellId，会给源item直接添加cellId，以至于后边相同组件的item的cellId都是一样的
    const newList = cloneDeep(list);
    let newItemData = newList.map(field=>{
      if(field.name === 'Containers' && !field.children) field.children = [];
      if(field.cellId) return field;
      field.cellId = `${field.name}-${new Date().getTime()}-${Math.floor(Math.random()*1000)}`;
      return field;
    })
    setItemData(newItemData);
  }

  return ( 
    <div className={styles.ContentBox}>
      <h3>表单页面</h3>
      <ReactSortable
          className={styles.FormContent}
          animation={150}
          // 拖拽组件需要配置以下group属性，才能add
          group={{
            name: 'fieldItemContainer',
            pull: true,
            put: true
          }}
          sort={true}
          scroll={true}
          list={ItemData}
          setList={handleSortableSetList}
          // onAdd={handleSortableAdd}
      >
          {loop(ItemData, '')}
      </ReactSortable>  
    </div>
  );
}
 
export default Content;


/** 添加组件 最外层 */ 
// const handleSortableAdd = useCallback((e:any, s:any, d:any)=>{
//   // 添加组件名
//   const addComponent = e.clone && e.clone.getAttribute('data-id');
//   // 拖拽元素的目标路径
//   const { newIndex } = e;

//   const formItemList = cloneDeep(formItemData);
//   const diffItem:any = formItemList.find(item => item.name === addComponent) || {};
//   diffItem.cellId = `${diffItem?.name}-${new Date().getTime()}-${Math.floor(Math.random()*1000)}`;
//   if(diffItem.name === 'Containers') diffItem.children = [];
//   const newItemData = cloneDeep(ItemData);
//   newItemData.splice(newIndex, 0, diffItem);
//   setItemData(()=>[...newItemData]);
//   debugger;
// }, [ItemData]);


/** 添加组件 - 内层Sortable */ 
// const handleChildSortableAdd = useCallback((e:any, s:any, d:any)=>{
// // 添加组件名
// const addComponent = e.clone.getAttribute('data-id');
// // 父组件cellId
// const parentNodeCellId = e?.to?.getAttribute?.('id');
// // 拖拽元素的目标路径
// const { newIndex } = e;

// const formItemList = cloneDeep(formItemData);
// const diffItem:any = formItemList.find(item => item.name === addComponent) || {};
// diffItem.cellId = `${diffItem?.name}-${new Date().getTime()}-${Math.floor(Math.random()*1000)}`;
// if(diffItem.name === 'Containers') diffItem.children = [];

// const newItemData = cloneDeep(ItemData);
// const appointField:any = findAppointField(newItemData, parentNodeCellId) || [];
// appointField.children && appointField.children.splice(newIndex, 0, diffItem);
// setItemData(()=>[...newItemData]);
// debugger;
// }, [ItemData]);