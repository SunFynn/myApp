import { Carousel, Row, Col } from 'antd';
// typescript
import type { FC } from 'react';
import type { CarouselProps } from 'antd/lib/carousel';
// less
import styles from './style.less';

interface CarouselProProps {}

const CarouselPro: FC<CarouselProProps> = () => {
  const settings: CarouselProps = {
    // 是否显示面板指示点
    dots: false,
    // 是否自动切换
    autoplay: true,
    // 毫秒
    autoplaySpeed: 3000,
    accessibility: true,
    speed: 1000,
    // 每次滚动前都会调用
    // beforeChange: function (currentSlide, nextSlide) {
    //   console.log('before change', currentSlide, nextSlide);
    // },
    // 每次滚动后都会调用
    // afterChange: function (currentSlide) {
    //   console.log('after change', currentSlide);
    // },
  };

  const list = [
    '桐乡市中心城区改造安置房项目（桐城景苑三期项目）A区',
    '桐乡市广播电视发射塔迁建工程',
    '桐乡市大麻镇中心学校扩建工程',
    '桐乡市子恺学校小学部（暂名）',
    '桐乡市教师进修学校附属幼儿园新建工程',
    '桐乡市伯鸿小学新建工程',
    '桐乡市文华教育中心新建工程',
    '桐乡市教育文化发展投资有限公司附属配套用房新建工程',
    '桐乡市濮院茅盾实验小学扩建工程',
    '桐乡市屠甸中学改扩建工程',
    '桐乡市居家养老服务指导中心新建项目',
    '1#厂房、配电房（含消控室）（洲泉镇后塘科技创新集聚区年产200万套智能开关建设项目）',
    '桐乡市洲泉镇金鸡路安置房工程',
    '1968数字文化创意产业园',
  ];

  return (
    <div className={styles.content}>
      <Carousel
        {...settings}
        dotPosition="right"
        className={styles.list}
        infinite={list.length > 7}
        // 显示条数
        slidesToShow={8}
        // slidesToShow={Math.min(10, ranking.length)}
        // 滚动条数
        slidesToScroll={1}
      >
        {list.map((item: any) => {
          return (
            <Row className={styles.wrapper} key={item}>
              <Col span={24} className={styles.label}>
                <span> {item}</span>
              </Col>
            </Row>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselPro;
