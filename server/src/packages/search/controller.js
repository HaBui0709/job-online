import lodash from 'lodash'
import { helper, response } from '../../utils'
import { CareerGroupModel, RecuitermentModel } from '../../model';
import configs from '../../configs';


/**
 * Get ALl career group
 */
const allCareerGroup = async (req, res) => {
  const locale = helper.getLocale(req)
  let careerGroups = await CareerGroupModel.findDocsByCondition({ active: true })

  // brief info
  careerGroups = careerGroups.map((item) => {
    return {
      _id: item._id,
      name: item.name,
    }
  })
  return response.r200(res, locale, { careerGroups })
}

const searchJob = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const query = {
    ...lodash.pick(req.query,
      ['keyword', 'career', 'city', 'salary', 'workMode', 'gender', 'experience', 'degreeRequirement']),
    active: true,
    status: 'approved',
  }
  const limit = configs.limit.careerGroup.all
  const data = await Promise.all([{
    recuiterments: await RecuitermentModel.findByCondition(query, { page, limit }),
    total: await RecuitermentModel.countByCondition(query),
    limitPerPage: limit,
  }])
  const result = data[0]
  return response.r200(res, locale, result)
}

export default {
  allCareerGroup,
  searchJob,
}
