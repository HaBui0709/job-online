import { NotificationModel } from '../../model'

const { CronJob } = require('cron')

const run = async () => {
  console.log('Da chay cronjob')
  const jobEveryDay = new CronJob({
    cronTime: '0 44 0 * * *',
    onTick: async () => {
      console.log('Thong bao vao luc 23 h')
      const condition = {
        frequency: 'every_day',
      }
      await NotificationModel.cronjobSendEmailWithFrequency(condition)
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  jobEveryDay.start()

  // Set to global variable, and start
  // global.cronJobs.notification_verery_day = jobEveryDay
}

run()
