import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Popover } from 'antd';
import React, { useCallback } from 'react';
import { SketchPicker } from 'react-color';
import './index.less';

export interface AntdColorPickerProps {
  /**
   * 颜色值
   */
  value?: string;
  /**
   * 是否禁止操作
   */
  disable?: boolean;
  /**
   * 选择发生改变时
   */
  onChange?: (color: string) => void;
}

const Preset_Colors = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
  '#A9ABB1',
];

const AntdColorPicker = React.memo((props: AntdColorPickerProps) => {
  const { onChange, value, disable = false } = props;
  const prefixCls = usePrefixCls('formily-color-picker');

  const onChangeComplete = useCallback(
    (color) => {
      onChange?.(color.hex);
    },
    [onChange],
  );

  return (
    <div className={prefixCls} style={{ pointerEvents: disable ? 'none' : 'auto' }}>
      <Popover
        trigger="click"
        placement="bottom"
        overlayClassName={`${prefixCls}__popover`}
        content={
          <SketchPicker
            className={`${prefixCls}__color-picker`}
            color={value ? value : Preset_Colors[0]}
            disableAlpha
            onChange={onChangeComplete}
            presetColors={Preset_Colors}
          />
        }
      >
        <div className={`${prefixCls}__color-block`} style={{ background: value ? value : Preset_Colors[0] }} />
      </Popover>
    </div>
  );
});

export default AntdColorPicker;
