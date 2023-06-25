import type { FunctionComponent } from 'react';
import { Helmet } from 'umi';

interface HelmetComProps {}

const HelmetCom: FunctionComponent<HelmetComProps> = () => {
  return (
    <Helmet>
      <title>喵喵 & 嘿嘿</title>
      <meta name="keywords" content="个人博客" />
      <meta name="description" content="项目整理，记录生活" />
    </Helmet>
  );
};

export default HelmetCom;
