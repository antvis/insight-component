import { HolderOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Button } from 'antd';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import DragList from './DragList';
import './index.less';
import PaletteItem from './PaletteItem';

export type CustomPaletteProps = {
  ranges: string[];
  className?: string;
  onChange: (value: string[]) => void;
  onCancel: () => void;
};

// 自定义调色面板
const CustomPalette = (props: CustomPaletteProps) => {
  const prefixCls = usePrefixCls('formily-custom-palette');
  const [paletteRanges, setPaletteRanges] = useState([]);
  const { ranges, onChange, onCancel } = props;

  useEffect(() => {
    if (ranges.length) {
      const palette = ranges.map((item) => {
        return {
          id: uniqueId(),
          value: item,
        };
      });
      setPaletteRanges(palette);
    }
  }, [ranges]);

  const onDragEnd = (newLayerList: []) => {
    setPaletteRanges(newLayerList);
  };

  const addPaletteRangeItem = () => {
    const addItem = { id: uniqueId(), value: paletteRanges[paletteRanges.length - 1].value };
    const ranges = [...paletteRanges, addItem];
    setPaletteRanges(ranges);
  };

  const deletePaletteRangeItem = (id: string) => {
    setPaletteRanges((pre) => pre.filter((item) => item.id !== id));
  };

  const onSubmit = () => {
    const ranges = paletteRanges.map((item) => item.value);
    onChange(ranges);
    onCancel();
  };

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}__selection-item`}>
        {paletteRanges.map((color) => (
          <span
            key={color.id}
            style={{
              backgroundColor: color.value,
              height: '22px',
              width: `${100 / paletteRanges.length}%`,
            }}
          />
        ))}
      </div>
      <div>
        <DragList items={paletteRanges} onDrag={onDragEnd} dragIcon={<HolderOutlined />}>
          {(palette: any, icon: JSX.Element) => (
            <PaletteItem
              key={palette.id}
              dragIcon={icon}
              palette={palette.value}
              onDelete={() => deletePaletteRangeItem(palette.id)}
            />
          )}
        </DragList>
        <div>
          <span onClick={addPaletteRangeItem} className={`${prefixCls}__add-palette`}>
            + 添加
          </span>
        </div>
        <div className={`${prefixCls}__btn`}>
          <Button type="text" onClick={onCancel}>
            取消
          </Button>
          <Button type="text" onClick={onSubmit}>
            确定
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomPalette;