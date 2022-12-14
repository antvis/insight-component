import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import type { SelectProps } from 'antd';
import React, { useMemo, useState } from 'react';
import ColorPaletteGroup from './ColorPaletteGroup';
import { COLOR_RANGES } from './constants/color-ranges';
import './index.less';
import PaletteConfigs from './PaletteConfig';

export type AntdColorRangeSelectorProps = SelectProps<string[], string[]>;

const AntdColorRangeSelector = (props: AntdColorRangeSelectorProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector', props);
  // const ribbonList = props.options && props.options.length ? props.options : COLOR_RANGES;

  const [paletteConfig, setPaletteConfig] = useState<{
    type: string;
    steps: number;
    reversed: boolean;
  }>({
    type: 'sequential',
    steps: 9,
    reversed: false,
  });

  //  选中筛选数据
  const updatePelrtteConfig = ({ key, value }) => {
    setPaletteConfig((pre) => ({ ...pre, [key]: value }));
  };

  // 显示颜色列表
  const ribbonList = useMemo(() => {
    return COLOR_RANGES.filter(
      (item) => item.colors.length === paletteConfig.steps && item.type === paletteConfig.type,
    ).map((item) => item.colors.reverse());
  }, [props.options, paletteConfig]);

  // 颜色数量
  const ribbonStepOptions = useMemo(() => {
    const ribbonSteps: number[] = [];
    COLOR_RANGES.filter((item) => item.type === paletteConfig.type).map((item) => {
      ribbonSteps.push(item.colors.length);
    });
    return [...new Set(ribbonSteps)].map((item) => ({ value: item, label: item }));
  }, [paletteConfig.type]);

  // 配置项 list
  const paletteConfigList = useMemo(() => {
    return [
      {
        id: 'type',
        label: '类型',
        type: 'select',
        value: paletteConfig.type,
        config: {
          options: [
            { value: 'sequential', label: 'sequential' },
            { value: 'singlehue', label: 'singlehue' },
            { value: 'qualitative', label: 'qualitative' },
            { value: 'diverging', label: 'diverging' },
          ],
        },
        onChange: updatePelrtteConfig,
      },
      {
        id: 'steps',
        label: '数量',
        type: 'select',
        value: paletteConfig.steps,
        config: {
          options: ribbonStepOptions,
        },
        onChange: updatePelrtteConfig,
      },
      {
        id: 'reversed',
        label: '反转',
        type: 'switch',
        value: paletteConfig.reversed,
        config: {},
        onChange: updatePelrtteConfig,
      },
    ];
  }, [ribbonStepOptions]);

  return (
    <div className={prefixCls}>
      {props.value && (
        <div className={`${prefixCls}__selection-item`}>
          {props.value.map((color) => (
            <span
              key={color}
              style={{
                backgroundColor: color,
                height: '22px',
                width: `${100 / props.value.length}%`,
              }}
            />
          ))}
        </div>
      )}
      <div className={`${prefixCls}__palette-config-panel`}>
        {paletteConfigList.map((item) => (
          <PaletteConfigs {...item} />
        ))}

        <ColorPaletteGroup
          colorList={ribbonList}
          onClick={(value) => {
            props?.onChange(value, value);
          }}
        />
      </div>
    </div>
  );
};

export default AntdColorRangeSelector;
