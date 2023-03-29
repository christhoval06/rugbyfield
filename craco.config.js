module.exports = {
  babel: {
    // presets: ["@babel/preset-react"/*"@babel/preset-env"*/],
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-transform-runtime',
    ],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      console.log("BABEL");
      console.log(babelLoaderOptions);
      return babelLoaderOptions;
    },
  },
};
// https://codepen.io/jzmmm/pen/XKGOJk
