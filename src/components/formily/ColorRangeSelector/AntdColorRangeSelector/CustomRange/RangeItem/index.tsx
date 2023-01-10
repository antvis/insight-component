import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Input, Popover } from 'antd';
import React from 'react';
import { SketchPicker } from 'react-color';
import './index.less';

type RangeItemProps = {
  color: string;
  onDelete: () => void;
  onChange: (color: string) => void;
  dragIcon?: JSX.Element;
};

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

const RangeItem = ({ color: defaultValue, onDelete, onChange, dragIcon }: RangeItemProps) => {
  const prefixCls = usePrefixCls('formily-range-item');

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}__drag-icon`}>{dragIcon}</div>
      <div className={`${prefixCls}__infor`} onClick={(e) => e.stopPropagation()}>
        <Popover
          trigger="click"
          placement="bottom"
          overlayClassName={`${prefixCls}__infor__popover`}
          content={
            <SketchPicker
              className={`${prefixCls}__infor__color-picker`}
              color={defaultValue ? defaultValue : Preset_Colors[0]}
              disableAlpha
              onChange={(color) => {
                onChange(color.hex);
              }}
              presetColors={Preset_Colors}
            />
          }
        >
          <div className={`${prefixCls}__infor__color`} style={{ background: defaultValue }} />
        </Popover>

        <div className={`${prefixCls}__infor__input`}>
          <Input bordered={false} value={defaultValue} size="small" onChange={(e) => onChange(e.target.value)} />
        </div>
        <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
};

export default RangeItem;
