import { sendEmail } from '../../modules/mailer'

/**
 * Send  mail job
 *
 * @param {Object} data
 *
 */
const sendMailJobs = async (data) => {
  const dataSendEmail = data.recuiterments
  // Send mail for tracking
  const mailData = {
    user: {
      email: data.user.email,
    },
    data: dataSendEmail,
  }

  await sendEmail(mailData, 'sendNotification')
}

export default {
  sendMailJobs,
}
