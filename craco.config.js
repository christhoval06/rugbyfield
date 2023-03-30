module.exports = {
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-private-methods', { loose: false }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
    ],
  },
};
// https://codepen.io/jzmmm/pen/XKGOJk
