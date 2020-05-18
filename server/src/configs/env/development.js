export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://localhost/job-online',
  dbOptions: {
    native_parser: true,
    // autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  // Secret for token
  secret: '59)SUIJOc^Apc*W(',

  host: {
    files: 'https://zodyapp-dev.s3.amazonaws.com/',
  },

  // Mailer
  mailer: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    from: 'Minh Nguyễn Thanh <minh.milano1511@gmail.com>',
    report: 'minh.milano1511@gmail.com',
    transportMethod: 'SMTP',
    service: 'Gmail',
    auth: {
      user: 'minh.milano1511@gmail.com',
      pass: 'minh@15662',
    },
  },

  // URL
  url: {
    host: 'http://127.0.0.1:5070/static/',
  },
}
