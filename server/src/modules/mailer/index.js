/**
 * Send mail to user, using config account
 *
 */
import nodemailer from 'nodemailer'
import configs from '../../configs'
import templates from './template'
import { to } from '../../utils'

const transport = nodemailer.createTransport(configs.mailer)

/**
 * Send email
 * @param {Object} data: Data of mail
 * @param {String} template: template name
 *
 */
const sendEmail = async (data, template) => {
  // Return if mail template not found
  if (!templates[template]) {
    console.log('Template chua san sang')
    return false
  }

  // Setup email
  const options = {
    to: data.user.email,
    from: data.user.from ? data.user.from : configs.mailer.from,
  }

  const mailOptions = templates[template](data.data, options)
  const { error } = await to(transport.sendMail(mailOptions))
  if (error) {
    console.log('Error', error)
  }
}

export {
  sendEmail,
}
