import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { AntdColorRangeSelectorProps } from './AntdColorRangeSelector';
import AntdColorRangeSelector from './AntdColorRangeSelector';

const RibbonSelect: ReactFC<AntdColorRangeSelectorProps> = connect(
  AntdColorRangeSelector,
  mapProps({
    dataSource: 'options',
    loading: true,
  }),
);

export default RibbonSelect;
