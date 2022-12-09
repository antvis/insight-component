import colorbrewer from 'colorbrewer';

export type ColorRange = {
  name?: string;
  /**
   * 色带类型
   * 连续 ｜ 分类 ｜ 发散 ｜ 单色
   */
  type?: 'sequential' | 'qualitative' | 'diverging' | 'singlehue';
  category?: string;
  colors: string[];
};

// Add colorbrewer color schemes (Data Science requirement)
// See http://colorbrewer2.org/
const colorBrewerMap = Object.entries(colorbrewer.schemeGroups).reduce(
  (accu: Record<string, string>, [type, palettes]: [string, string[]]) => ({
    ...accu,
    ...palettes.reduce(
      (group, name) => ({
        ...group,
        [name]: type,
      }),
      {},
    ),
  }),
  {},
);

export const COLOR_RANGES: ColorRange[] = Object.entries(colorbrewer)
  .filter(([keyName]) => keyName !== 'schemeGroups')
  .map(([keyName, colorScheme]: [string, Record<string, string[]>]) => {
    return Object.entries(colorScheme).map(([lenKey, colors]) => ({
      name: `ColorBrewer ${keyName}-${lenKey}`,
      type: colorBrewerMap[keyName],
      category: 'ColorBrewer',
      colors: colors,
    }));
  })
  .flat();

// export const DEFAULT_COLOR_RANGE = colorRanges.find(({ name }) => name === 'ColorBrewer YlGn-6') || {
//   name: 'Global Warming',
//   type: 'sequential',
//   category: 'LI',
//   colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300'],
// };
