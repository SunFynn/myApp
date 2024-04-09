import {
  Rate,
  Input,
  Divider,
  DatePicker,
  InputNumber,
  Switch,
  Slider,
  Checkbox,
  Radio,
  Select,
} from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const options = [];
for (let i = 0; i < 3; i++) {
  options.push({
    key: i.toString(),
    label: `选项 ${i}`,
    value: i.toString(),
  });
}

const GlobalComponent: any = {
  Divider,
  DatePicker,
  RangePicker,
  MonthPicker,
  WeekPicker,
  Input,
  TextArea,
  InputNumber,
  Switch,
  Slider,
  CheckboxGroup,
  RadioGroup,
  Select,
  Rate,
};

export interface fieldItem {
  name: string;
  id: string;
  attr: any;
  label: string;
  cellId?: string;
  children?: any[];
}

const formItemData: fieldItem[] = [
  {
    name: 'Containers',
    id: 'Containers',
    attr: {
      style: {
        border: '1px solid #dde6f0',
      },
    },
    label: '容器',
  },
  {
    name: 'RangePicker',
    id: 'RangePicker',
    attr: {
      style: {
        width: '100%',
      },
      defaultValue: undefined,
      placeholder: ['开始时间', '结束时间'],
    },
    label: '区间选择框',
  },
  {
    name: 'DatePicker',
    id: 'DatePicker',
    attr: {
      style: {
        width: '100%',
      },
      defaultValue: undefined,
      placeholder: '请选择日期',
    },
    label: '日选择框',
  },
  {
    name: 'MonthPicker',
    id: 'MonthPicker',
    attr: {
      style: {
        width: '100%',
      },
      defaultValue: undefined,
      placeholder: '请选择月份',
    },
    label: '月选择框',
  },
  {
    name: 'WeekPicker',
    id: 'WeekPicker',
    attr: {
      style: {
        width: '100%',
      },
      defaultValue: undefined,
      placeholder: '请选择周期',
    },
    label: '周选择框',
  },
  {
    name: 'Input',
    id: 'Input',
    attr: {
      defaultValue: '',
      placeholder: '请输入',
    },
    label: '文本框',
  },
  {
    name: 'TextArea',
    id: 'TextArea',
    attr: {
      defaultValue: '',
      placeholder: '请输入',
    },
    label: '文本域',
  },
  {
    name: 'InputNumber',
    id: 'InputNumber',
    attr: {
      defaultValue: undefined,
      placeholder: '请输入',
    },
    label: '数字框',
  },
  {
    name: 'Switch',
    id: 'Switch',
    attr: {
      style: {
        width: 44,
      },
      defaultValue: false,
    },
    label: '开关',
  },
  {
    name: 'Slider',
    id: 'Slider',
    attr: {
      style: {
        width: '100%',
        padding: '0',
      },
      defaultValue: 10,
    },
    label: '滑动条',
  },
  {
    name: 'Rate',
    id: 'Rate',
    attr: {
      style: {
        width: '100%',
        color: '#3591f4',
      },
      defaultValue: 0,
    },
    label: '评分',
  },
  {
    name: 'Divider',
    id: 'Divider',
    attr: {},
    label: '分割线',
  },
  {
    name: 'CheckboxGroup',
    id: 'CheckboxGroup',
    attr: {
      options: options,
      defaultValue: [],
    },
    label: '多选框',
  },
  {
    name: 'RadioGroup',
    id: 'RadioGroup',
    attr: {
      options: options,
      defaultValue: options[0].value,
    },
    label: '单选框',
  },
  {
    name: 'Select',
    id: 'Select',
    attr: {
      options: options,
      defaultValue: options[0].value,
      placeholder: '请选择',
    },
    label: '下拉框',
  },
];

export { formItemData, GlobalComponent, options };
