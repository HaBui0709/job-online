// import Redis from 'ioredis'

// // Init redis
// let redis = new Redis(6379, process.env.REDIS_PATH || '127.0.0.1')

// const runRedis = (mediator) => {
//   redis = new Redis(6379, process.env.REDIS_PATH || '127.0.0.1')
//   redis.on('ready', () => {
//     mediator.emit('redis.ready')
//   })

//   redis.on('error', (err) => {
//     console.log('redis.error', err)
//     // Exit app
//     process.exit(1)
//   })
// }


// const getStore = () => {
//   return redis
// }

// const set = async (key, value) => {
//   const store = getStore()
//   await store.set(key, value)
// }

// const get = async (key) => {
//   const store = getStore()
//   const value = await store.get(key)
//   return value
// }

// const deleteByKey = async (key) => {
//   const store = getStore()
//   await store.del(key)
// }

// export default {
//   runRedis,
//   getStore,
//   set,
//   get,
//   deleteByKey,
// }
