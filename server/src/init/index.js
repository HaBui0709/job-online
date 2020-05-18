import connectDb from './db'
// import redis from './redis'
import { validateCode } from '../locales'

export default async () => {
  await connectDb()
  // redis.runRedis(mediator)
  require('./misc')
  require('../model')
  validateCode()
  // require('../migration')

  // mediator.once('redis.ready', async () => {
  // console.log('- REDIS/'.padEnd(15), 'READY')
  // Init data for redis
  // require('./data')
  // })
}
