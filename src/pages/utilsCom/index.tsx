import type { FunctionComponent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import QRCode from 'qrcode.react';
import cs from 'classnames';
import { downloadCanvesToImage } from '@/utils/utils';
import styles from './style.less';

interface UtilsComProps {}

const UtilsCom: FunctionComponent<UtilsComProps> = () => {
  return (
    <PageContainer title="封装方法调用展示" extra="封装的方法调用展示页面">
      <div className={styles.UtilsCom}>
        <Card title="下载canves图片" className={styles.CanvesToImage}>
          <div className={cs(styles.QrcodeDownload, 'QrcodeDownload')}>
            <div className={styles.cardTitle}>邀请码</div>
            <QRCode
              value={'http://www.wtz-lmm.cn'}
              size={144}
              includeMargin={false}
              fgColor="#000000" //二维码的颜色
              style={{
                padding: 10,
                lineHeight: 0,
                borderRadius: 8,
                backgroundColor: '#fff',
                marginBottom: 9,
              }}
            />
            <div className={styles.cardFooter}>邀请您关注此博客</div>
          </div>
          <Button
            type="primary"
            onClick={() => {
              downloadCanvesToImage('.QrcodeDownload');
            }}
            className={styles.primaryBtn}
          >
            下载二维码
          </Button>
        </Card>
      </div>
    </PageContainer>
  );
};

export default UtilsCom;
