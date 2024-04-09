import { FunctionComponent, Fragment } from "react";
import { Form, Input } from "antd";

interface RangePickerProps {}
 
const RangePicker: FunctionComponent<RangePickerProps> = () => {
  return ( 
    <Fragment>
      <Form.Item 
        name="placeholder0" 
        label="placeholder0" 
        initialValue={'请输入'}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="placeholder1" 
        label="placeholder1" 
        initialValue={'请输入'}
      >
        <Input />
      </Form.Item>
    </Fragment>
  );
}
 
export default RangePicker;