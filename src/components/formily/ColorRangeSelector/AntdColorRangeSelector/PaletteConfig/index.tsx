import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Select, Switch } from 'antd';
import React from 'react';
import './index.less';

export type PaletteConfigProps = {
  id: string;
  label: string;
  type: string;
  config: { options?: { label: string | number; value: string | number }[] };
  value: string | number | boolean;
  onChange: (val: { key: string; value: string | number | boolean }) => void;
  className?: string;
};

// 选择色带的自定义组件
const PaletteConfig = (props: PaletteConfigProps) => {
  const prefixCls = usePrefixCls('formily-palette-config-item');
  const { id, label, type, config, value, onChange } = props;

  return (
    <div className={prefixCls} key={id}>
      {label}
      {type === 'select' && (
        <Select
          value={value}
          style={{ width: 120 }}
          options={config.options}
          onChange={(value) => onChange({ key: id, value })}
        />
      )}
      {type === 'switch' && (
        <Switch defaultChecked={value as boolean} onChange={(value) => onChange({ key: id, value })} />
      )}
    </div>
  );
};

export default PaletteConfig;
