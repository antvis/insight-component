import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Input } from 'antd';
import React from 'react';
import './index.less';

type PaletteItemProps = {
  palette: any;
  dragIcon?: JSX.Element;
};

const PaletteItem = ({ palette, dragIcon }: PaletteItemProps) => {
  const prefixCls = usePrefixCls('formily-palette-item');

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}__drag-icon`}>{dragIcon}</div>
      <div className={`${prefixCls}__infor`} onClick={(e) => e.stopPropagation()}>
        <div className={`${prefixCls}__infor__color`} style={{ background: palette }} />
        <div className={`${prefixCls}__infor__input`}>
          <Input value={palette} size="small" bordered={false} />
        </div>
        <div className={`${prefixCls}__infor__delete-icon`}>
          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
};

export default PaletteItem;
