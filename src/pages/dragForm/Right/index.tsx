import { FunctionComponent, useEffect } from "react";
import { Button, Form, message } from "antd";
import { cloneDeep } from "lodash";
import ConfigFormItems from "./ConfigFormItems";
import styles from "./style.less";

interface RightProps {
  activeItem: any;
  setActiveItem: any;
  ItemData: any;
  setItemData: any;
}
 
const Right: FunctionComponent<RightProps> = (props) => {
  const { activeItem, ItemData, setItemData } = props;

  const [ form ] = Form.useForm();
  const { validateFields, setFieldsValue, setFieldValue } = form;

  useEffect(()=>{
    const { label, attr = {} } = activeItem;
    const { placeholder, defaultValue } = attr;

    if(Array.isArray(placeholder)){
      setFieldValue('placeholder0', placeholder[0]);
      setFieldValue('placeholder1', placeholder[1]);
    }

    setFieldsValue({
      label,
      placeholder,
      defaultValue,
    });
  }, [activeItem, ItemData]);

  /** 确定保存 - 组件项配置 */
  const handleSubmitConfig = ()=>{
    validateFields().then(value=>{
      Object.entries(value).forEach(item=>{
        if(item[0] === 'placeholder') activeItem.attr.placeholder = item[1];
        else if(item[0] === 'placeholder0') activeItem.attr.placeholder[0] = item[1];
        else if(item[0] === 'placeholder1') activeItem.attr.placeholder[1] = item[1];
        else if(item[0] === 'defaultValue') {
          activeItem.attr.defaultValue = item[1];
          activeItem.attr.value = item[1];
        }
        else activeItem[item[0]] = item[1];
      });
      const newItemData = cloneDeep(ItemData);
      setItemData(newItemData);
    }).catch(error=>{
      console.error(error, 'error');
    })
  }

  /** 保存 */
  const handleSave = ()=>{
    localStorage.setItem('formStorage', JSON.stringify(ItemData));
    message.success('保存成功');
  }

  /** 发布 */
  const handleSubmit = ()=>{
    console.log(ItemData, '--');
    message.success('发布成功');
  }

  return ( 
    <div className={styles.RightBox}>
      <div className={styles.TopBtns}>
        <Button className={styles.saveBtn} onClick={handleSave}>保存</Button>
        <Button type={"primary"} onClick={handleSubmit}>发布</Button>
      </div>
      <div className={styles.FormConfig}>
        <h4>组件项配置 {activeItem.name ? ` - ${activeItem.name}` : ''}</h4>
        {
          Object.keys(activeItem).length ? 
          <>
            <ConfigFormItems form={form} type={activeItem.name}  />
            <Button type="primary" style={{width: '100%'}} onClick={handleSubmitConfig}>确定</Button>
          </>
          : null
        }
      </div> 
    </div>
  );
}
 
export default Right;