require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Free Travel Guy - Helping you find the best credit cards to enable free trips.',
    description: 'Helping you find the best credit cards to enable free trips.',
    name: 'Free Travel Guy',
    head: {
      meta: [
        {name: 'description', content: 'Helping you find the best credit cards to enable free trips.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'FreeTravelGuy - Easy, Free Trips'},
        {property: 'og:image', content: 'http://thenano.agency/wp-content/uploads/2016/03/Tony-The-Tigre.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'FreeTravelGuy - Easy, Free Trips'},
        {property: 'og:description', content: 'Helping you find the best credit cards to enable free trips.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@tiger'},
        {property: 'og:creator', content: '@tiger'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
