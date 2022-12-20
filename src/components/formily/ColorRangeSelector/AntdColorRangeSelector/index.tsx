import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Popover } from 'antd';
import { cloneDeep } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import ColorPaletteGroup from './ColorPaletteGroup';
import type { ColorRange } from './constants/color-ranges';
import { COLOR_RANGES } from './constants/color-ranges';
import './index.less';
import type { PaletteConfigProps } from './PaletteConfig';
import PaletteConfigs from './PaletteConfig';

export type valueProps = {
  colors: string[];
  isReversed?: boolean;
};

export interface AntdColorRangeSelectorProps {
  /**
   * 颜色值
   */
  value?: valueProps;
  /**
   * colorList
   */
  options?: ColorRange[];
  /**
   * 选择发生改变时
   */
  onChange?: (val: valueProps) => void;
}

const AntdColorRangeSelector = (props: AntdColorRangeSelectorProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector');
  const ribbons = props.options && props.options.length ? props.options : COLOR_RANGES;
  const [selectedValue, setSelectValue] = useState(props.value);

  useEffect(() => {
    props.onChange(selectedValue);
  }, [selectedValue]);

  const [paletteConfig, setPaletteConfig] = useState<{
    type: string;
    steps: number;
  }>({
    type: 'all',
    steps: selectedValue.colors.length ?? 0,
  });

  const onTypeChange = (type: Record<string | number, any>) => {
    setPaletteConfig((pre) => ({ ...pre, ...type }));
  };

  const onStepsChange = (steps: Record<string | number, any>) => {
    setPaletteConfig((pre) => ({ ...pre, ...steps }));
  };

  const onIsReversedChange = ({ isReversed }) => {
    setSelectValue((pre) => ({ ...pre, isReversed }));
  };

  // 颜色列表
  const ribbonList = useMemo(() => {
    let list = [];

    list = ribbons.filter((item) => item.colors?.length === paletteConfig.steps);

    if (paletteConfig.type !== 'all') {
      list = list.filter((item) => item.type === paletteConfig.type);
    }

    return list.map((item) => item.colors);
  }, [ribbons, paletteConfig]);

  // 数量
  const ribbonStepOptions = useMemo(() => {
    const ribbonSteps: number[] = [];
    if (paletteConfig.type === 'all') {
      ribbons.forEach((item) => {
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
            { value: 'all', label: '全部' },
            { value: 'sequential', label: '连续型' },
            { value: 'singlehue', label: '纯色渐变' },
            { value: 'qualitative', label: '定性的' },
            { value: 'diverging', label: '离散型' },
          ],
        },
        onChange: onTypeChange,
      },
      {
        id: 'steps',
        label: '数量',
        type: 'select',
        value: paletteConfig.steps,
        config: {
          options: ribbonStepOptions,
        },
        onChange: onStepsChange,
      },
      {
        id: 'isReversed',
        label: '反转',
        type: 'switch',
        value: props.value.isReversed,
        config: {},
        onChange: onIsReversedChange,
      },
    ];
  }, [ribbonStepOptions, paletteConfig.steps, props.value.isReversed]);

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
            colorList={cloneDeep(ribbonList)}
            selectedValue={selectedValue.colors}
            isReversed={selectedValue.isReversed}
            onChange={(value) => {
              setSelectValue((pre) => ({ ...pre, colors: value }));
            }}
          />
        </div>
      }
    >
      <div className={`${prefixCls}__selection-item`}>
        {(props.value.isReversed ? selectedValue.colors.slice().reverse() : selectedValue.colors.slice() || []).map(
          (color, index) => (
            <span
              key={`${color}-${index}-selected`}
              style={{
                backgroundColor: String(color),
                height: '22px',
                width: `${100 / selectedValue.colors.length}%`,
              }}
            />
          ),
        )}
      </div>
    </Popover>
  );
};

export default AntdColorRangeSelector;
