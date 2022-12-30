import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ColorPaletteGroup from './ColorPaletteGroup';
import { DEFAULT_VALUE, getColorGroupByName } from './constants';
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
  const colorRanges = props.options && props.options.length ? props.options : COLOR_RANGES;
  const [selectedValue, setSelectValue] = useState(props.value ?? DEFAULT_VALUE);
  const [rangeName, setRangeName] = useState('');
  const [open, setOpen] = useState(false);
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
    setSelectValue((pre) => ({
      ...pre,
      isReversed,
      colors: pre.colors.slice().reverse(),
    }));
  };

  const onSelectValueChange = (color: string[]) => {
    setSelectValue((pre) => ({ ...pre, colors: pre.isReversed ? color.slice().reverse() : color }));
  };

  // 颜色列表
  const colorRangeList = useMemo(() => {
    let list = [];

    list = colorRanges.filter((item) => item.colors?.length === paletteConfig.steps);

    if (paletteConfig.type !== 'all') {
      list = list.filter((item) => item.type === paletteConfig.type);
    }

    return list;
  }, [colorRanges, paletteConfig]);

  // 数量
  const colorRangeStepOptions = useMemo(() => {
    const rangeSteps: number[] = [];

    if (paletteConfig.type === 'all') {
      colorRanges.forEach((item) => {
        rangeSteps.push(item.colors?.length);
      });
    } else {
      colorRanges
        .filter((item) => item.type === paletteConfig.type)
        .map((item) => {
          rangeSteps.push(item.colors?.length);
        });
    }

    return [...new Set(rangeSteps)].map((item) => ({ value: item, label: item }));
  }, [paletteConfig.type, colorRanges]);

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
          options: colorRangeStepOptions,
        },
        onChange: onStepsChange,
      },
      {
        id: 'isReversed',
        label: '反转',
        type: 'switch',
        value: selectedValue.isReversed,
        config: {},
        onChange: onIsReversedChange,
      },
    ];
  }, [colorRangeStepOptions, paletteConfig.steps]);

  useEffect(() => {
    if (selectedValue.colors) {
      const select = selectedValue.isReversed ? selectedValue.colors.slice().reverse() : selectedValue.colors;
      const selectRange = colorRangeList.find((item) => item.colors.toString() === select.toString());
      const name = getColorGroupByName(selectRange);
      setRangeName(name);
    }
  }, [selectedValue.colors]);

  useEffect(() => {
    if (selectedValue.colors.length !== paletteConfig.steps) {
      const ranges = colorRangeList.find((item) => getColorGroupByName(item) === rangeName);
      if (ranges) {
        setSelectValue((pre) => ({
          ...pre,
          colors: pre.isReversed ? ranges.colors.slice().reverse() : ranges.colors,
        }));
      }
    }
  }, [paletteConfig.steps]);

  useEffect(() => {
    if (selectedValue) {
      props.onChange({ ...selectedValue });
    }
  }, [selectedValue]);

  return (
    <Select
      className={`${prefixCls}`}
      open={open}
      onDropdownVisibleChange={() => setOpen(true)}
      dropdownRender={() => (
        <div
          className={`${prefixCls}__selection-panel-content`}
          onMouseLeave={() => setOpen(false)}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {paletteConfigList.map((item) => (
            <PaletteConfigs key={item.id} {...item} />
          ))}
          <ColorPaletteGroup
            colorRange={colorRangeList}
            selectedValue={selectedValue.colors}
            isReversed={selectedValue.isReversed}
            onChange={(color) => onSelectValueChange(color)}
          />
        </div>
      )}
      value={selectedValue.colors.toString()}
    >
      {colorRanges.map((item) => {
        const colorList = selectedValue.isReversed ? item.colors.slice().reverse() : item.colors;
        return (
          <Select.Option key={colorList.toString()} value={colorList.toString()}>
            <div className={`${prefixCls}__selection-item`}>
              {colorList.map((color) => (
                <span
                  key={color}
                  style={{
                    backgroundColor: color,
                    height: '22px',
                    width: `${100 / colorList.length}%`,
                  }}
                />
              ))}
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdColorRangeSelector;
