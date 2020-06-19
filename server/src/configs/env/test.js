export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://localhost/job-online-test',
  dbOptions: {
    native_parser: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000,
  },

  // Secret for token
  secret: 'J^hi_^uwyhAO!bkJ',
}
