import { HeartOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = '个人技术网站';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'wtz',
          title: 'wtz',
          href: '',
          blankTarget: true,
        },
        {
          key: 'love',
          title: <HeartOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'lmm',
          title: 'lmm',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
