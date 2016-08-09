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
  port: process.env.PORT || environment.isProduction ? 8080 : 3000,
  authTokenName: 'UIMARKETPLACE_TOKEN',
  graphqlEndpoint: '/api/graphql',
  secretKey: 'd35d1690-7f39-4676-830d-7dc8720b1475',
  rethinkDB: {
    host: 'localhost',
    port: 28015,
    db: 'uibuffs'
  }
}, environment);
