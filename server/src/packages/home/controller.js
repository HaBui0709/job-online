import { helper, response } from '../../utils'
import { RecuitermentModel, CVModel } from '../../model'


/**
 * Get jobIteresting
 */
const jobIteresting = async (req, res) => {
  const locale = helper.getLocale(req)
  const { limit = 10 } = req.query
  const condition = {
    status: 'approved',
    active: true,
  }
  const sort = { 'salary.value.to': -1 }
  const data = await RecuitermentModel.findDataByCondition(condition, { limit }, sort)
  return response.r200(res, locale, data)
}

/**
 * Viec gấp
 */
const jobUrgent = async (req, res) => {
  const locale = helper.getLocale(req)
  const { limit = 10 } = req.query
  const condition = {
    status: 'approved',
    active: true,
  }
  const sort = { deadline: 1 }
  const data = await RecuitermentModel.findDataByCondition(condition, { limit }, sort)
  return response.r200(res, locale, data)
}

/**
 * Job suggest
 */
const getJobSuggest = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user: { _id } } = req
  let jobsSuggest = []

  console.log('careers334')
  if (!_id || (_id && req.user.role !== 'candidate')) {
    return response.r200(res, locale, { jobsSuggest })
  }

  // Check cv is existed
  const isCVExisted = await CVModel.countByCondition({
    user: _id,
  })

  if (!isCVExisted) {
    return response.r200(res, locale, { jobsSuggest })
  }

  // Get Careers
  const careers = await CVModel.getCareersByUser({
    user: _id,
  })

  // Get recuiter suggests
  const sort = { 'salary.value.to': -1 }
  const page = 0
  const limit = 5
  const recuitermentData = await RecuitermentModel.findByCondition({
    careers,
    status: 'approved',
    active: true,
  }, { page, limit }, sort)

  // console.log('ABC: ', recuitermentData)
  const recuitermentIds = recuitermentData.map(item => item._id)
  jobsSuggest = await RecuitermentModel.getBriefInfoByIds(recuitermentIds)
  return response.r200(res, locale, { jobsSuggest })
}

/**
 * Get jobs new
 */
const getJobsNew = async (req, res) => {
  const { locale } = helper.getLocale(req)
  const page = 0
  const limit = 5
  const recuitermentData = await RecuitermentModel.findByCondition({
    status: 'approved',
    active: true,
  }, { page, limit }, '-createdAt')

  const recuitermentIds = recuitermentData.map(item => item._id)
  const newJobs = await RecuitermentModel.getBriefInfoByIds(recuitermentIds)
  return response.r200(res, locale, { newJobs })
}

export default {
  jobIteresting,
  jobUrgent,
  getJobSuggest,
  getJobsNew,
}
