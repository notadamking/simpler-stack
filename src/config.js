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
  port: process.env.PORT || 3000,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
  authTokenName: 'UIBUFFS_TOKEN',
  graphqlEndpoint: '/api/graphql',
  secretKey: 'd35d1690-7f39-4676-830d-7dc8720b1471',
  rethinkDB: {
    host: 'localhost',
    port: 28015,
    db: 'uibuffs'
  }
}, environment);
