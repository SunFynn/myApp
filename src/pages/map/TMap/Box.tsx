import type { FC } from 'react';
import Tmap from './index';
import { list } from '@/services/map/tmap';

interface BoxProps {}

const Box: FC<BoxProps> = () => {
  return (
    <Tmap
      projectList={list}
      defaultZoom={9}
      centerPoint={{ centerCity: '金华市', lng: 119.653423, lat: 29.084615 }}
    />
  );
};

export default Box;
