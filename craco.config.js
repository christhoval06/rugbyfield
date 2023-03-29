module.exports = {
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-transform-runtime',
    ],
  },
};
// https://codepen.io/jzmmm/pen/XKGOJk
