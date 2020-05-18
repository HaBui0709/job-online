import config from '../configs'

export default {
  isDevelopment: process.env.NODE_ENV === config.env.development,
  isProduction: process.env.NODE_ENV === config.env.production,
  isTest: process.env.NODE_ENV === config.env.test,
}
