import key from '../key'

const notificationKey = key.notification

// 700 -> 799
export default {
  [notificationKey.emailInvalid]: 700,
  [notificationKey.emailRequired]: 701,

  [notificationKey.salaryInvalid]: 702,
  [notificationKey.careersMustBeArray]: 703,
  [notificationKey.careersItemMustBeObjectId]: 704,
  [notificationKey.careersRequired]: 705,

  [notificationKey.notificationIsExisted]: 706,
}
