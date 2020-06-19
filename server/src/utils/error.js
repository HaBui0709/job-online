import { localesKey } from '../locales'

/**
 * Get message from error object
 *
 * @param {Object}  error
 */
const message = (error) => {
  if (!error) {
    return localesKey.common.serverError
  }

  if (error.errorKey) {
    return error.errorKey
  }

  let code = ''
  if (error.name === 'MongoError' || error.name === 'BulkWriteError') {
    if (error.code === 11000) {
      code = localesKey.common.dataAlreadyExisted
    } else {
      // code = commonLocale.serverError
      code = localesKey.common.serverError
    }
  } else if (error.errors) {
    code = error.errors[Object.keys(error.errors)[0]]
      ? error.errors[Object.keys(error.errors)[0]].message
      : localesKey.common.serverError
  } else {
    code = -1
  }

  return code
}

/**
 * Get error from promise (using "to" function)
 *
 * @param {Object} error
 */
const fromPromise = ({ error }) => {
  if (error) {
    return message(error)
  }
  return ''
}

export default {
  message,
  fromPromise,
}
