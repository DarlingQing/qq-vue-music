// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 2,
      propWhiteList: ['*'],
      selectorBlackList: ['.no-rem'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}