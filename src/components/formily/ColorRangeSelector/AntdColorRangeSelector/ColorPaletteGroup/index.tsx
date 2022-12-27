import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import classnames from 'classnames';
import React from 'react';
import './index.less';

export type ColorPaletteGroupProps = {
  colorRange: string[][];
  selectedValue: string[];
  isReversed: boolean;
  onChange: (color: string[]) => void;
};

const ColorPaletteGroup = (props: ColorPaletteGroupProps) => {
  const prefixCls = usePrefixCls('formily-color-palette-group');
  const { colorRange, selectedValue, isReversed, onChange } = props;

  const ColorPaletteGroupItem = (props) => {
    const { color, ...prop } = props;

    return (
      <div
        {...prop}
        className={classnames(`${prefixCls}__item`, {
          [`${prefixCls}__item-selected`]: color.toString() === selectedValue.toString(),
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
      {colorRange.map((colorArr: any, index: number) => {
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
