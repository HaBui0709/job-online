import moment from 'moment'
import { validation, format } from '../../utils'
import { ObjectId } from '../../utils/mongoose'

/**
 * Find condition from object
 *
 * @param {Object} condition allow _id properties
 */
const findByCondition = ({
  _id,
  status,
  keyword,
  business,
  active,
  career,
  city,
  workMode,
  gender,
  experience,
  degreeRequirement,
  careers = [],
  salary,
  startAt,
  endAt,
  startChart,
  endChart,
  date,
  dateNow,
}) => {
  const condition = {}
  // _id
  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  if (status && status !== 'all') {
    condition.status = status
  }
  if (validation.isBoolean(active)) {
    condition.active = active
  }

  if (keyword) {
    condition.searchString = format.searchString(keyword)
  }

  if (validation.isObjectId(business)) {
    condition.business = new ObjectId(business)
  }
  if (validation.isObjectId(career)) {
    condition.careers = {
      $in: [career],
    }
  }
  if (city && city !== 'all') {
    condition.city = city
  }

  if (workMode) {
    condition.workMode = workMode
  }

  if (gender & gender !== 'all') {
    condition.gender = gender
  }

  if (experience) {
    condition.experience = experience
  }

  if (degreeRequirement) {
    condition.degreeRequirement = degreeRequirement
  }

  if (salary) {
    condition['salary.key'] = salary
  }
  if (careers.length) {
    condition.careers = {
      $in: careers,
    }
  }

  if (startAt && endAt) {
    condition.updatedAt = {
      $gte: moment(startAt).startOf('d').toDate(),
      $lte: moment(endAt).endOf('d').toDate(),
    }
  }
  if (startChart && endChart) {
    condition.updatedAt = {
      $gte: moment(startChart).startOf('d').toDate(),
      $lte: moment(endChart).endOf('d').toDate(),
    }
  }

  if (date && validation.isValidDate(date)) {
    condition.updatedAt = {
      $gte: moment(date).startOf('d').toDate(),
      $lte: moment(date).endOf('d').toDate(),
    }
  }

  if (dateNow && validation.isValidDate(dateNow)) {
    condition.deadline = {
      $lte: moment(dateNow).endOf('d').toDate(),
    }
  }

  return condition
}

export default {
  findByCondition,
}
