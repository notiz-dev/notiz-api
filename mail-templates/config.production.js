/*
|-------------------------------------------------------------------------------
| Production config           https://maizzle.com/docs/environments/#production
|-------------------------------------------------------------------------------
|
| This is where you define settings that optimize your emails for production.
| These will be merged on top of the base config.js, so you only need to
| specify the options that are changing.
|
*/

module.exports = {
  baseImageURL: 'https://notiz.dev/assets/',
  notiz: {
    website: 'https://notiz.dev',
    mail: 'hi@notiz.dev',
    github: 'https://github.com/notiz-dev',
    twitter: 'https://twitter.com/notiz_dev',
  },
  baseApiURL: 'http://localhost:3000',
  build: {
    templates: {
      destination: {
        path: '../src/mail/templates',
        extension: 'hbs',
      },
    },
  },
  inlineCSS: {
    enabled: true,
  },
  prettify: {
    enabled: true,
  },
  removeUnusedCSS: {
    enabled: true,
  },
};
