export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://localhost/job-online-dev',
  dbOptions: {
    // useNewUrlParser: true,
    autoReconnect: true,
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  },

  // Secret for user token
  secret: process.env.USER_TOKEN_SECRET,
}
