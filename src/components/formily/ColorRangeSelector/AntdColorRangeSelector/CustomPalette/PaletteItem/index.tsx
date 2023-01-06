import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Input, Popover } from 'antd';
import React from 'react';
import { SketchPicker } from 'react-color';
import './index.less';

type PaletteItemProps = {
  palette: any;
  onDelete: () => void;
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

const PaletteItem = ({ palette, onDelete, dragIcon }: PaletteItemProps) => {
  const prefixCls = usePrefixCls('formily-palette-item');

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
              color={palette ? palette : Preset_Colors[0]}
              disableAlpha
              onChange={(color) => {
                console.log(color, '测试');
              }}
              presetColors={Preset_Colors}
            />
          }
        >
          <div className={`${prefixCls}__infor__color`} style={{ background: palette }} />
        </Popover>

        <div className={`${prefixCls}__infor__input`}>
          <Input value={palette} size="small" bordered={false} />
        </div>
        <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
};

export default PaletteItem;
