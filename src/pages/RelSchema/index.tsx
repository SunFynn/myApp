import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Rel1 from './components/Rel1';
import Rel2 from './components/Rel2';
import Rel3 from './components/Rel3';
import Rel4 from './components/Rel4';
import styles from './index.less';

/**
 * echarts关系图
 */

interface RelSchemaProps {}

const RelSchema: FC<RelSchemaProps> = () => {
  const defaultEnterprise = '桐乡市城市建设投资有限公司';

  return (
    <PageContainer>
      <div className={styles.RelSchema}>
        <div className={styles.relCard}>
          <h2 className={styles.title}>单向关系图</h2>
          <Rel1 enterprise={defaultEnterprise} />
        </div>
        <div className={styles.relCard} style={{ height: '510px' }}>
          <h2 className={styles.title}>双向关系图</h2>
          <Rel2 enterprise={defaultEnterprise} />
        </div>
        <div className={styles.relCard} style={{ height: '540px' }}>
          <h2 className={styles.title}>过滤关系图</h2>
          <Rel3 />
        </div>
        <div className={styles.relCard} style={{ height: '480px', width: '800px' }}>
          <h2 className={styles.title}>多关系图</h2>
          <Rel4 />
        </div>
      </div>
    </PageContainer>
  );
};

export default RelSchema;
