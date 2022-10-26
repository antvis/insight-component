import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'Insight Component',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  mode: 'site',
  base: '/',
  publicPath: '/',
  outputPath: 'docs-dist',
  metas: [
    { name: 'keywords', content: 'AntV insight component' },
    { name: 'description', content: 'Components for GI & LI' },
  ],
  locales: [['zh-CN', '中文']],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/antvis/insight-component',
    },
  ],
  extraBabelIncludes: ['@antv/dumi-theme-antv'],
  theme: {
    '@s-site-menu-width': '280px',
    '@primary-color': '#873bf4',
  },
  themeConfig: {
    carrier: 'insight-component',
  },
  hash: true,
  // 同步 gh-page CNAME 文件
  copy: isProduction ? ['docs/CNAME'] : [],
  devtool: isProduction ? false : 'eval',
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    lodash: '_',
  },
  styles: ['https://gw.alipayobjects.com/os/lib/antd/4.23.6/dist/antd.css'],
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.development.js',
    'https://gw.alipayobjects.com/os/lib/antd/4.23.6/dist/antd.js',
    /** lodash */
    'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
  ],
  // more config: https://d.umijs.org/config
});
