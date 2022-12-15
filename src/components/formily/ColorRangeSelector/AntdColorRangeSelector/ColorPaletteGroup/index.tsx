import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import classnames from 'classnames';
import React from 'react';
import './index.less';

export type ColorPaletteGroupProps = {
  colorList: Record<string, any>[];
  selectedValue: string[];
  onClick: (color: string[]) => void;
};

const ColorPaletteGroup = (props: ColorPaletteGroupProps) => {
  const prefixCls = usePrefixCls('formily-color-palette-group');
  const { colorList = [], selectedValue = [], onClick } = props;

  const ColorPaletteGroupItem = ({ color }) => {
    return (
      <div
        className={classnames(
          `${prefixCls}__item`,
          color.toString() === selectedValue.toString() ? `${prefixCls}__item-selected` : '',
        )}
        onClick={() => onClick(color)}
      >
        {(color || []).map((colorItem: string) => (
          <span
            key={colorItem}
            style={{
              backgroundColor: colorItem,
              height: '22px',
              width: `${100 / color.length}%`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={prefixCls}>
      {colorList.map((colorArr: string[], index: number) => {
        return <ColorPaletteGroupItem key={index} color={colorArr} />;
      })}
    </div>
  );
};

export default ColorPaletteGroup;
