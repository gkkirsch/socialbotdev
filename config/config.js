var env = process.env.NODE_ENV || 'development';

var config = {
  'development': {
    api_url: 'https://nuvi-challenge.herokuapp.com/',
  },
  'production': {
    api_url: 'https://nuvi-challenge.herokuapp.com/',
  }
}

module.exports = config[env]