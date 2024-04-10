import type { FunctionComponent } from 'react';
import { useEffect } from "react";
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import QRCode from 'qrcode.react';
import cs from 'classnames';
import { 
  urlToBase64,
  urlToBlob,
  blobToUrl,
  blobToBase64,
  base64ToBlob, 

  downloadCanvesToImage, 
  downloadFileZip, 
} from "@/utils/fileStream";
import styles from './style.less';

interface UtilsComProps {}

const UtilsCom: FunctionComponent<UtilsComProps> = () => {
 
  // 测试url、base64、blob之间的相互转换
  useEffect(()=>{
    urlToBase64('/publicShareCDN/image/3.jpg').then((res)=>{
      console.log(res, 'url转为base64类型');
      
      console.log(base64ToBlob(res), 'base64转为blob格式')
    });

    urlToBlob('/publicShareCDN/file/text.xls').then(res=>{
      console.log(res, 'url转为blob类型');

      console.log(blobToUrl(res), 'blob转为url格式');

      blobToBase64(res).then(base=>{
        console.log(base, 'blob转为base64格式')
      })
    })

  }, []);

  return (
    <PageContainer title="封装方法调用展示" extra="封装的方法调用展示页面">
      <div className={styles.UtilsCom}>
        <Card title="下载页面中的元素" className={cs(styles.card, styles.CanvesToImage)}>
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
        <Card title="下载指定文件" className={cs(styles.card, styles.downLoadFile)}>
          <div className={styles.downBtnBox}>
            <Button type='primary' onClick={()=>{downloadFileZip('/publicShareCDN/image/3.jpg', '测试')}}>下载图片</Button>
            <Button type='primary' onClick={()=>{downloadFileZip('/publicShareCDN/file/text.xls', '测试')}}>下载xls格式文件</Button>
            <Button type='primary' onClick={()=>{downloadFileZip('/publicShareCDN/file/text.doc', '测试')}}>下载doc格式文件</Button>
            <Button type='primary' onClick={()=>{downloadFileZip('/publicShareCDN/file/text.ppt', '测试')}}>下载ppt格式文件</Button>
            <Button type='primary' onClick={()=>{downloadFileZip('/publicShareCDN/file/text.txt', '测试')}}>下载txt格式文件</Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default UtilsCom;
