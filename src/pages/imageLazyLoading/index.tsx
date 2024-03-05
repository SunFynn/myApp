import { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';

export default function Image() {
  const [Images, setImages] = useState<any[]>([]);

  const imageBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // document.querySelectorAll('.lazy-image')选择器获取的是伪数组，需要转化为真数组，才能使用数组的一些方法
    setImages(Array.from(document.querySelectorAll('.lazy-image')));
  }, []);


  const inViewShow = () => {
    const ImageCopy = [...Images];
    let completed = 0;
    for (let i = 0; i < ImageCopy.length; i++) {
      const image: any = ImageCopy[i];
      // 出现在视野的时候加载图片
      if (image.getBoundingClientRect().top < window.innerHeight) {
        if(!image.src) image.src = image.dataset.src;
        // 图片的complete属性,如果为true则表明图片已经加载完毕
        if(image.complete) completed += 1;
        // 如果全部都加载完 则去掉滚动事件监听
        if (ImageCopy.length === completed) {
          imageBox.current?.removeEventListener('scroll', throttleInviewShow);
        }
      }
    }
  };

  const throttleInviewShow = throttle(inViewShow);

  const init = () => {
    if ('IntersectionObserver' in window) {
      // 方法2，IntersectionObserver
      const lazyImageObserver = new IntersectionObserver((entries) => {
        // entries是一个数组，表示监听的元素列表
        entries.forEach((entry) => {
          // 如果元素可见
          if (entry.isIntersecting) {
            const lazyImage: any = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            // 移除监听元素
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      // 监听每个图片元素
      Images.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // 方法1，监听scroll事件，判断图片位置
      inViewShow(); // 为了初始页面加载的时候，视图区域内的图片正常展示
      if (imageBox.current) imageBox.current.addEventListener('scroll', throttle(inViewShow));
    }
  };

  useEffect(() => {
    init();
  }, [Images]);

  return (
    <PageContainer title="图片懒加载">
      <div className={`${styles.images} admin-content`} ref={imageBox}>
        <img
          data-src="http://picnew13.photophoto.cn/20190114/wangluokejibeijingbizhisucai8kchaogaoqing-31818641_1.jpg"
          className={`lazy-image ${styles['lazy-image']}`}
        />
        <img
          data-src="http://f.hiphotos.baidu.com/zhidao/pic/item/eac4b74543a982267a3d54978a82b9014b90eb86.jpg"
          className={`lazy-image ${styles['lazy-image']}`}
        />
        <img
          data-src="http://g.hiphotos.baidu.com/image/pic/item/6d81800a19d8bc3e770bd00d868ba61ea9d345f2.jpg"
          className={`lazy-image ${styles['lazy-image']}`}
        />
        <img
          data-src="http://c.hiphotos.baidu.com/zhidao/pic/item/8d5494eef01f3a2987a8062f9f25bc315d607ceb.jpg"
          className={`lazy-image ${styles['lazy-image']}`}
        />
        <img
          data-src="http://imgsrc.baidu.com/image/c0%3Dpixel_huitu%2C0%2C0%2C294%2C40/sign=5a7938d38acb39dbd5cd6f16b96e6c48/aec379310a55b3196c79de4c48a98226cffc1702.jpg"
          className={`lazy-image ${styles['lazy-image']}`}
        />
        <img
          data-src="http://c.hiphotos.baidu.com/image/pic/item/9c16fdfaaf51f3de1e296fa390eef01f3b29795a.jpg"
          className={`lazy-image ${styles['lazy-image']}`}
        />
      </div>
    </PageContainer>
  );
}
