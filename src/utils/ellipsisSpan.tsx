import { Tooltip } from 'antd';

const ellipsisSpan = (text: string, width = 200, fontSize = 12) => {
  if (!text) return '';
  const zhArr = [];
  (text || '').split('').forEach((v) => {
    // eslint-disable-next-line no-unused-expressions
    if (/[\u4e00-\u9fa5]/.test(v)) zhArr.push(v);
  });
  const otherWidth = text.length - zhArr.length;
  const rellyWidth = zhArr.length * fontSize + (otherWidth * fontSize) / 2;
  if (rellyWidth >= width) {
    return (
      <Tooltip
        title={text}
        placement="topLeft"
        getPopupContainer={(trigger): any => trigger.parentNode}
      >
        <div
          style={{
            width: `${width - 20}px`,
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      </Tooltip>
    );
  } else return text;
};
export default ellipsisSpan;
