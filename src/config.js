require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const NAME = 'Free Travel Guy';
const TITLE = 'Best Travel Credit Card Offers for Free Flights';
const DESCRIPTION = 'Find how to get free flights with credit card offers. We have searched every travel card and thousands of ways to redeem points to find how to get your destination for free.';

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: TITLE,
    description: DESCRIPTION,
    name: NAME,
    head: {
      meta: [
        {name: 'description', content: DESCRIPTION},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: NAME},
        {property: 'og:image', content: 'http://www.freetravelguy.com/free_travel_guy_share.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: TITLE},
        {property: 'og:description', content: DESCRIPTION},
        {property: 'og:image:width', content: '1200'},
        {property: 'og:image:height', content: '630'},
        {property: 'fb:app_id', content: '1697227587263342'}
      ]
    }
  },

}, environment);
