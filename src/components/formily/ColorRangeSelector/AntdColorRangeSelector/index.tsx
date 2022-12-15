import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Popover } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ColorPaletteGroup from './ColorPaletteGroup';
import type { ColorRange } from './constants/color-ranges';
import { COLOR_RANGES } from './constants/color-ranges';
import './index.less';
import type { PaletteConfigProps } from './PaletteConfig';
import PaletteConfigs from './PaletteConfig';

export interface AntdColorRangeSelectorProps {
  /**
   * 颜色值
   */
  value?: string[];
  /**
   * colorList
   */
  options?: ColorRange[];
  /**
   * 选择发生改变时
   */
  onChange?: (color: string[]) => void;
}

const AntdColorRangeSelector = (props: AntdColorRangeSelectorProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector');
  const ribbons = props.options && props.options.length ? props.options : COLOR_RANGES;

  const [paletteConfig, setPaletteConfig] = useState<{
    type: string;
    steps: number;
    reversed: boolean;
  }>({
    type: 'all',
    steps: 6,
    reversed: false,
  });

  useEffect(() => {
    if (props.value) {
      setPaletteConfig((pre) => ({ ...pre, steps: props.value.length }));
    }
  }, [props.value]);

  const updatePelrtteConfig = (change: Record<string | number, any>) => {
    setPaletteConfig((pre) => ({ ...pre, ...change }));
  };

  // 颜色列表
  const ribbonList = useMemo(() => {
    if (paletteConfig.type === 'all') {
      return ribbons
        .filter((item) => item.colors?.length === paletteConfig.steps)
        .map((item) => (paletteConfig.reversed ? item.colors.reverse() : item.colors));
    }
    return ribbons
      .filter((item) => item.colors?.length === paletteConfig.steps && item.type === paletteConfig.type)
      .map((item) => (paletteConfig.reversed ? item.colors.reverse() : item.colors));
  }, [ribbons, paletteConfig.steps, paletteConfig.type, paletteConfig.reversed]);

  // 数量
  const ribbonStepOptions = useMemo(() => {
    const ribbonSteps: number[] = [];
    if (paletteConfig.type === 'all') {
      ribbons.map((item) => {
        ribbonSteps.push(item.colors.length);
      });
    } else {
      ribbons
        .filter((item) => item.type === paletteConfig.type)
        .map((item) => {
          ribbonSteps.push(item.colors.length);
        });
    }

    return [...new Set(ribbonSteps)].map((item) => ({ value: item, label: item }));
  }, [paletteConfig.type, ribbons]);

  // 配置项 list
  const paletteConfigList: PaletteConfigProps[] = useMemo(() => {
    return [
      {
        id: 'type',
        label: '类型',
        type: 'select',
        value: paletteConfig.type,
        config: {
          options: [
            { value: 'all', label: 'all' },
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
  }, [ribbonStepOptions, paletteConfig.steps]);

  return (
    <Popover
      trigger="click"
      placement="bottom"
      overlayClassName={`${prefixCls}__palette-config-panel`}
      content={
        <div className={`${prefixCls}__palette-config-panel-content`}>
          {paletteConfigList.map((item) => (
            <PaletteConfigs key={item.id} {...item} />
          ))}

          <ColorPaletteGroup
            colorList={ribbonList}
            selectedValue={props.value}
            onClick={(value) => {
              props?.onChange(value);
            }}
          />
        </div>
      }
    >
      <div className={`${prefixCls}__selection-item`}>
        {(props.value || []).map((color) => (
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
    </Popover>
  );
};

export default AntdColorRangeSelector;
