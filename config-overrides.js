const {override, addBabelPlugin} = require('customize-cra');

/* config-overrides.js */
// decoratorsBeforeExport
module.exports = override(
	addBabelPlugin(["@babel/plugin-proposal-decorators", {legacy: true}]),
	addBabelPlugin(["@babel/plugin-proposal-class-properties", {loose: true}])
);

// https://codepen.io/jzmmm/pen/XKGOJk
