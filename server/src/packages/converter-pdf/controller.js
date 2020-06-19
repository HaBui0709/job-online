import fs from 'fs'
import pdf from 'html-pdf'
import handlebars from 'handlebars'
import moment from 'moment'

// import { CVModel } from '../../model'

import { format, response, helper } from '../../utils'
import configs from '../../configs'
import { localesKey } from '../../locales'
import { CVBeautyModel } from '../../model';

const options = {
  format: 'A4',
}

const complie = async (templateName, data) => {
  const filePath = `${process.cwd()}/src/packages/converter-pdf/templates/${templateName}.hbs`
  const html = fs.readFileSync(filePath, 'utf8')
  return handlebars.compile(html)(data)
}

handlebars.registerHelper('dateFormat', (value, formats) => {
  return moment(value).format(formats)
})

handlebars.registerHelper('getGender', (value) => {
  return helper.getGender(value)
})

handlebars.registerHelper('dateWithoutHour', (value) => {
  return format.dateWithNoHour(value)
})

handlebars.registerHelper('number', (value) => {
  return format.number(value)
})


handlebars.registerHelper('getCity', (value) => {
  return helper.getCity(value)
})

handlebars.registerHelper('phone', (value) => {
  return format.phone(value)
})

handlebars.registerHelper('graduationType', (value) => {
  return helper.graduationType(value)
})

handlebars.registerHelper('dateWithNoHourNoDay', (value) => {
  return format.dateWithNoHourNoDay(value)
})

handlebars.registerHelper('getLearning', (value) => {
  return helper.getLearning(value)
})

handlebars.registerHelper('getLanguage', (value) => {
  return helper.getLanguage(value)
})

/**
 * Export linkdownload pdf for cv
 */
const handlepdfForCV = async (req, res) => {
  const locale = helper.getLocale(req)
  const { cVBeautyData } = req
  // Get CV
  const cv = await CVBeautyModel.getDetail(cVBeautyData)

  const encryptSession = format.encrypt(`${Date.now()}`)

  // Get template
  const html = await complie('cv-1', cv)

  // Get name File
  const filename = `cv-new-${cv._id}-${encryptSession}`

  // Get file path
  const filePath = `${configs.file.uploadDir}${filename}.pdf`

  // Convert PDF
  await pdf.create(html, options).toFile(filePath, (err, resp) => {
    if (err) {
      // eslint-disable-next-line no-return-assign
      return response.r400(res, locale, localesKey.cv.pdtError)
    } else {
      console.log('fileName', resp.filename)
      const url = `${configs.url.host + filename}.pdf`
      return response.r200(res, locale, {
        url,
      })
    }
  })
}

// Export
export default {
  handlepdfForCV,
}
