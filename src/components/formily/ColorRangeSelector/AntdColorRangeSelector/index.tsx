import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { Popover } from 'antd';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import ColorPaletteGroup from './ColorPaletteGroup';
import type { ColorRange } from './constants/color-ranges';
import { COLOR_RANGES } from './constants/color-ranges';
import './index.less';
import type { PaletteConfigProps } from './PaletteConfig';
import PaletteConfigs from './PaletteConfig';

export type valueProps = {
  colors: string[];
  isReversed: boolean;
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
  const [selectionColor, setSelectionColor] = useState<valueProps>({ isReversed: false, colors: [] });
  const ribbons = props.options && props.options.length ? props.options : COLOR_RANGES;

  const [paletteConfig, setPaletteConfig] = useState<{
    type: string;
    steps: number;
  }>({
    type: 'all',
    steps: 6,
  });

  useEffect(() => {
    const { colors = [], isReversed = false } = props.value;
    setSelectionColor({ colors, isReversed });
    if (!isEmpty(colors)) {
      setPaletteConfig((pre) => ({ ...pre, steps: colors.length, reversed: isReversed }));
    }
  }, [props.value]);

  const updatePelrtteConfig = (change: Record<string | number, any>) => {
    setPaletteConfig((pre) => ({ ...pre, ...change }));
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
        id: 'isReversed',
        label: '反转',
        type: 'switch',
        value: selectionColor.isReversed,
        config: {},
        onChange: ({ isReversed }) => {
          setSelectionColor((pre) => ({ ...pre, isReversed: isReversed }));
        },
      },
    ];
  }, [ribbonStepOptions, paletteConfig.steps, selectionColor]);

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
            colorList={[...ribbonList]}
            selectedValue={selectionColor.colors}
            isReversed={selectionColor.isReversed}
            onClick={(value) => {
              setSelectionColor((pre) => ({ ...pre, colors: value }));
            }}
          />
        </div>
      }
    >
      <div className={`${prefixCls}__selection-item`}>
        {(selectionColor.isReversed ? selectionColor.colors.reverse() : selectionColor.colors || []).map(
          (color, index) => (
            <span
              key={`${color}-${index}-selected`}
              style={{
                backgroundColor: String(color),
                height: '22px',
                width: `${100 / selectionColor.colors.length}%`,
              }}
            />
          ),
        )}
      </div>
    </Popover>
  );
};

export default AntdColorRangeSelector;
