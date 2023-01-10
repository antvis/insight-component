import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Select } from 'antd';
import { isUndefined } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { DEFAULT_VALUE } from './constants';
import type { ColorRange } from './constants/color-ranges';
import { COLOR_RANGES } from './constants/color-ranges';
import DropDownContent from './DropDownContent';
import './index.less';

export type valueProps = {
  colors: string[];
  isReversed?: boolean;
};

export interface AntdColorRangeSelectorProps {
  /**
   * 颜色值
   */
  value?: valueProps;
  /**
   * colorRanges
   */
  options?: ColorRange[];
  /**
   * 选择发生改变时
   */
  onChange?: (val: valueProps) => void;
}

const AntdColorRangeSelector = (props: AntdColorRangeSelectorProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector');
  const colorRanges = props.options && props.options.length ? props.options : COLOR_RANGES;

  const selectedValue = useMemo(() => {
    if (isUndefined(props.value) || isUndefined(props.value.colors)) {
      return DEFAULT_VALUE;
    }

    return props.value;
  }, [props.value]);

  const [open, setOpen] = useState(false);

  return (
    <Select
      className={`${prefixCls}`}
      open={open}
      onDropdownVisibleChange={() => setOpen(true)}
      dropdownRender={() => (
        <div
          className={`${prefixCls}__selection-panel-content`}
          onMouseLeave={() => setOpen(false)}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <DropDownContent colorRanges={colorRanges} selectedValue={selectedValue} onChange={props.onChange} />
        </div>
      )}
      value={selectedValue.colors.toString()}
    >
      {[selectedValue].map((item) => {
        const colorList = item.colors;
        if (colorList.length === 0) return;

        return (
          <Select.Option key={colorList.toString()} value={colorList.toString()}>
            <div className={`${prefixCls}__selection-item`}>
              {colorList.map((color) => (
                <span
                  key={color}
                  style={{
                    backgroundColor: color,
                    height: '22px',
                    width: `${100 / colorList.length}%`,
                  }}
                />
              ))}
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdColorRangeSelector;
