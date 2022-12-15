import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Select, Switch } from 'antd';
import React from 'react';
import './index.less';

export type PaletteConfigItemType = 'select' | 'switch';

export type PaletteConfigProps = {
  id: string;
  label: string;
  type: PaletteConfigItemType;
  config: { options?: { label: string | number; value: string | number }[] };
  value: string | number | boolean;
  onChange: (val: Record<string, any>) => void;
  className?: string;
};

// 选择色带的自定义组件
const PaletteConfig = (props: PaletteConfigProps) => {
  const prefixCls = usePrefixCls('formily-palette-config-item');
  const { id, label, type, config, value: defaultValue, onChange } = props;

  return (
    <div className={prefixCls} key={id}>
      {label}
      {type === 'select' && (
        <Select value={defaultValue} options={config.options} onChange={(value) => onChange({ [id]: value })} />
      )}
      {type === 'switch' && (
        <Switch defaultChecked={defaultValue as boolean} onChange={(value) => onChange({ [id]: value })} />
      )}
    </div>
  );
};

export default PaletteConfig;
