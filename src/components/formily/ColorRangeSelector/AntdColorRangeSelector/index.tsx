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
   * colorRanges
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

  const selectedValue = useMemo(() => {
    return props.value ?? DEFAULT_VALUE;
  }, [props.value]);

  const [open, setOpen] = useState(false);
  const [paletteConfig, setPaletteConfig] = useState<{
    type: string;
    steps: number;
  }>({
    type: 'all',
    steps: selectedValue.colors.length ?? 0,
  });

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
    const rangeSteps: { value: number; label: number }[] = [];
    const list =
      paletteConfig.type === 'all' ? colorRanges : colorRanges.filter((item) => item.type === paletteConfig.type);

    list.forEach((item) => {
      if (rangeSteps.findIndex((_item) => _item.value === item.colors?.length) !== -1) {
        return;
      }

      rangeSteps.push({ value: item.colors?.length, label: item.colors?.length });
    });

    return rangeSteps;
  }, [paletteConfig.type, colorRanges]);

  const onPaletteConfigChange = (config: Record<string | number, any>) => {
    setPaletteConfig((pre) => ({ ...pre, ...config }));
  };

  const onIsReversedChange = ({ isReversed }) => {
    props.onChange({
      isReversed,
      colors: selectedValue.colors.slice().reverse(),
    });
  };

  const onSelectValueChange = (color: string[]) => {
    props.onChange({
      isReversed: selectedValue.isReversed,
      colors: selectedValue.isReversed ? color.slice().reverse() : color,
    });
  };

  useEffect(() => {
    if (selectedValue.colors.length !== paletteConfig.steps) {
      const select = props.value.isReversed ? props.value.colors.slice().reverse() : props.value.colors;
      const selectRange = colorRanges.find((item) => item.colors.toString() === select.toString());
      const rangeSelectedName = getColorGroupByName(selectRange);
      if (!rangeSelectedName) {
        return;
      }
      const ranges = colorRangeList.find((item) => getColorGroupByName(item) === rangeSelectedName);
      if (ranges) {
        props.onChange({
          isReversed: selectedValue.isReversed,
          colors: selectedValue.isReversed ? ranges.colors.slice().reverse() : ranges.colors,
        });
      }
    }
  }, [colorRangeList]);

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
            { value: 'sequential', label: '连续' },
            { value: 'singlehue', label: '单色' },
            { value: 'qualitative', label: '分类' },
            { value: 'diverging', label: '发散' },
          ],
        },
        onChange: onPaletteConfigChange,
      },
      {
        id: 'steps',
        label: '数量',
        type: 'select',
        value: paletteConfig.steps,
        config: {
          options: colorRangeStepOptions,
        },
        onChange: onPaletteConfigChange,
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
  }, [colorRangeStepOptions, paletteConfig.steps, selectedValue]);

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
