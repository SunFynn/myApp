import WaterFallGridBox from './_grid';
import WaterFallPositionBox from './_position';
import styles from './style.less';

interface WaterfallBoxProps {
  list: { img: string; title: string; desction: string }[];
}

export default function WaterfallBox(props: WaterfallBoxProps) {
  const { list } = props;

  return (
    <div className={styles.WaterfallBox}>
      <WaterFallGridBox list={list} />
      <WaterFallPositionBox list={list} />
    </div>
  );
}
