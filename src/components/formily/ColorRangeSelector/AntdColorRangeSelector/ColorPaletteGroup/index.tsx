import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import React from 'react';
import './index.less';

export type ColorPaletteGroupProps = {
  colorList: Record<string, any>[];
  onClick: (color: string[]) => void;
};

const ColorPaletteGroup = (props: ColorPaletteGroupProps) => {
  const prefixCls = usePrefixCls('formily-color-palette-group');
  const { colorList = [], onClick } = props;

  const ColorPaletteGroupItem = ({ color }) => {
    return (
      <div className={`${prefixCls}__item`} onClick={() => onClick(color)}>
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
