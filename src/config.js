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
  authTokenName: 'GREEN_STACK_TOKEN',
  graphqlEndpoint: '/api/graphql',
  secretKey: '29b5c43f-39bf-4c12-9243-6c0180d6d600',
  rethinkDB: {
    host: 'localhost',
    port: 28015,
    db: 'green_stack'
  }
}, environment);
