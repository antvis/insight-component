import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import classnames from 'classnames';
import React from 'react';
import type { ColorRange } from '../constants/color-ranges';
import './index.less';

export type ColorPaletteGroupProps = {
  colorRange: ColorRange[];
  selectedValue: string[];
  isReversed: boolean;
  onChange: (color: string[]) => void;
};

const ColorPaletteGroup = (props: ColorPaletteGroupProps) => {
  const prefixCls = usePrefixCls('formily-color-palette-group');
  const { colorRange, selectedValue, isReversed, onChange } = props;

  const ColorPaletteGroupItem = (item) => {
    const { color, ...prop } = item;

    return (
      <div
        {...prop}
        className={classnames(`${prefixCls}__item`, {
          [`${prefixCls}__item--selected`]: color.toString() === selectedValue.toString(),
        })}
      >
        {color.map((colorItem: string, index) => (
          <span key={`${colorItem}-${index}`} style={{ backgroundColor: colorItem, width: `${100 / color.length}%` }} />
        ))}
      </div>
    );
  };

  return (
    <div className={prefixCls}>
      {colorRange.map((colorArr: ColorRange, index: number) => {
        return (
          <ColorPaletteGroupItem
            key={index}
            color={isReversed ? colorArr.colors.slice().reverse() : colorArr.colors}
            onClick={() => onChange(colorArr.colors)}
          />
        );
      })}
    </div>
  );
};

export default ColorPaletteGroup;
