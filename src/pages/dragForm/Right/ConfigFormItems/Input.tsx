import { FunctionComponent, Fragment } from "react";
import { Form, Input } from "antd";

interface InputConfigProps {}
 
const InputConfig: FunctionComponent<InputConfigProps> = (props) => {
  return ( 
    <Fragment>
      <Form.Item name="placeholder" label="placeholder" initialValue={'请输入'}>
        <Input />
      </Form.Item>
      <Form.Item name="defaultValue" label="默认值">
        <Input />
      </Form.Item>
    </Fragment>
  );
}
 
export default InputConfig;