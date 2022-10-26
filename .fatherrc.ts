export default {
  esm: { output: 'es' },
  cjs: { output: 'lib' },
  // https://github.com/umijs/father/blob/master/docs/config.md#umd
  umd: {
    name: 'InsightComponent',
    output: 'dist',
    extractCSS: false,
    externals: {
      lodash: '_',
      'lodash-es': '_',
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      '@ant-design/icons': 'icons',
      '@formily/core': 'Formily.Core',
      '@formily/reactive': 'Formily.Reactive',
      '@formily/shared': 'Formily.Shared',
      '@formily/react': 'Formily.React',
      '@formily/antd': 'Formily.Antd',
    },
    chainWebpack(memo) {
      memo
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
          { analyzerMode: 'static', openAnalyzer: false },
        ]);
      return memo;
    },
  },
};
