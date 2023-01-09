import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import DragList from './DragList';
import './index.less';
import RangeItem from './RangeItem';

export type CustomRangeProps = {
  ranges: string[];
  onChange: (value: string[]) => void;
  onCancel: () => void;
  className?: string;
};

type RangeItem = {
  id: string;
  value: string;
};

const CustomRange = (props: CustomRangeProps) => {
  const { ranges: defaultRanges, onChange, onCancel, className } = props;
  const prefixCls = usePrefixCls('formily-custom-range');
  const [ranges, setRanges] = useState<RangeItem[]>([]);

  useEffect(() => {
    if (defaultRanges.length) {
      const list = defaultRanges.map((item) => {
        return {
          id: uniqueId(),
          value: item,
        };
      });
      setRanges(list);
    }
  }, [defaultRanges]);

  const onDragEnd = (newLayerList: RangeItem[]) => {
    setRanges(newLayerList);
  };

  const addPaletteRangeItem = () => {
    const addItem: RangeItem = { id: uniqueId(), value: ranges[ranges.length - 1].value };
    const list: RangeItem[] = [...ranges, addItem];
    setRanges(list);
  };

  const deletePaletteRangeItem = (id: string) => {
    setRanges((pre) => pre.filter((item) => item.id !== id));
  };

  const onChangePaletteRangeItem = (color: RangeItem) => {
    const list = ranges.map((item) => {
      if (item.id === color.id) {
        return color;
      }
      return item;
    });
    setRanges(list);
  };

  const onSubmit = () => {
    const list = ranges.map((item) => item.value);
    onChange(list);
    onCancel();
  };

  return (
    <div className={classnames(`${prefixCls}`, className)}>
      <div className={`${prefixCls}__selection-item`}>
        {ranges.map((color) => (
          <span
            key={color.id}
            style={{
              backgroundColor: color.value,
              height: '22px',
              width: `${100 / ranges.length}%`,
            }}
          />
        ))}
      </div>

      <DragList items={ranges} onDrag={onDragEnd} dragIcon={<HolderOutlined />}>
        {(rangeItem: RangeItem, icon: JSX.Element) => (
          <RangeItem
            key={rangeItem.id}
            dragIcon={icon}
            color={rangeItem.value}
            onDelete={() => deletePaletteRangeItem(rangeItem.id)}
            onChange={(color: string) => onChangePaletteRangeItem({ id: rangeItem.id, value: color })}
          />
        )}
      </DragList>

      <div>
        <span onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
          <PlusOutlined /> 添加
        </span>
      </div>

      <div className={`${prefixCls}__btn`}>
        <span onClick={onCancel}>取消</span>
        <span onClick={onSubmit}>确定</span>
      </div>
    </div>
  );
};

export default CustomRange;
