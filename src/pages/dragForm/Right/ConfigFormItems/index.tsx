import { FunctionComponent, useMemo } from "react";
import { Form, Input } from "antd";
import InputConfig from "./Input";
import RangePickerConfig from "./RangePicker";
import DatePickerConfig from "./DatePicker";

const ConfigItems = {
  Input: InputConfig,
  RangePicker: RangePickerConfig,
  DatePicker: DatePickerConfig,
}

interface ConfigFormItemsProps {
  form: any;
  type: string;
}
 
const ConfigFormItems: FunctionComponent<ConfigFormItemsProps> = (props) => {
  const { form, type } = props;

  const layout = useMemo(()=>({
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  }), []);

  //@ts-ignore
  const TypeConfigItem = ConfigItems[type]

  console.log(form.getFieldsValue(), '-----')
  return ( 
    <Form {...layout} form={form} name="InputConfig">
      <Form.Item 
        name="label" 
        label="标题" 
        rules={[
          { required: true, message: '标题不能为空' }
        ]}
        initialValue={'123'}
      >
        <Input maxLength={10} />
      </Form.Item>
     
      { TypeConfigItem && <TypeConfigItem /> }
    </Form>
  );
}
 
export default ConfigFormItems;