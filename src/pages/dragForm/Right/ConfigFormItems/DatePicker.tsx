import { FunctionComponent, Fragment } from "react";
import { Form, Input } from "antd";

interface DatePickerProps {}
 
const DatePicker: FunctionComponent<DatePickerProps> = () => {
  return ( 
    <Fragment>
      <Form.Item 
        name="placeholder" 
        label="placeholder" 
        initialValue={'请输入'}
      >
        <Input />
      </Form.Item>
    </Fragment>
  );
}
 
export default DatePicker;