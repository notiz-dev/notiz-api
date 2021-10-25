/*
|-------------------------------------------------------------------------------
| Development config               https://maizzle.com/docs/environments/#local
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  notiz: {
    website: 'http://localhost:4200',
    mail: 'hi@notiz.dev',
    github: 'https://github.com/notiz-dev',
    twitter: 'https://twitter.com/notiz_dev',
  },
  urlParameters: {
    utm_source: 'newsletter',
    utm_medium: 'email',
  },
  build: {
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_local',
      },
      assets: {
        source: 'src/images',
        destination: 'images',
      },
    },
    components: {
      root: 'src/components',
    },
  },
};
