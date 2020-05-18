import { RecuitermentModel } from '../../model'

const { CronJob } = require('cron')

const run = async () => {
  console.log('Da chay cronjob completed')
  const jobCompleted = new CronJob({
    cronTime: '0 56 21 * * *',
    onTick: async () => {
      console.log('Bat dau duyet')
      await RecuitermentModel.cronjobCompleted()
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  jobCompleted.start()

  // Set to global variable, and start
  // global.cronJobs.notification_verery_day = jobEveryDay
}

run()
