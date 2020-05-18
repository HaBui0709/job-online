// Add more routes to the end of this array, do not modify this array order
const LIST_ROUTES = [
  // 0
  {
    id: '404',
    value: new RegExp('/404$', 'i'),
  },
  // 1
  {
    id: 'home',
    value: new RegExp('/home$', 'i'),
  },

  // 2
  {
    id: 'candidate/create-cv',
    value: new RegExp('/candidate/create-cv$', 'i'),
  },

  // 3
  {
    id: 'candidate/cv',
    value: new RegExp('/candidate/cv$', 'i'),
  },

  // 4
  {
    id: 'candidate/cv/preivew',
    value: new RegExp('/candidate/cv/preivew$', 'i'),
  },

  // 5
  {
    id: 'candidate/cv/preivew',
    value: new RegExp('/candidate/cv/preivew/.+$', 'i'),
  },

  // /recuiterments
  // 6
  {
    id: 'recuiterments',
    value: new RegExp('/recuiterments$', 'i'),
  },

  // 7
  {
    id: 'recuiterments',
    value: new RegExp('/recuiterments/.+$', 'i'),
  },

  // 8
  {
    id: 'home/recuiter',
    value: new RegExp('/home/recuiter$', 'i'),
  },

  // 9
  {
    id: 'company',
    value: new RegExp('/company$', 'i'),
  },

  // 10
  {
    id: 'company',
    value: new RegExp('/company/.+$', 'i'),
  },

  // 11
  {
    id: 'recuiter/recuiterment/create',
    value: new RegExp('/recuiter/recuiterment/create$', 'i'),
  },

  // 12
  {
    id: 'recuiter/recuiterments',
    value: new RegExp('/recuiter/recuiterments$', 'i'),
  },

  // 13
  {
    id: 'accounts',
    value: new RegExp('/accounts/.+$', 'i'),
  },

  // 14
  {
    id: '/business/update',
    value: new RegExp('/business/update/.+$', 'i'),
  },

  // 15
  {
    id: '/viec-lam/tim-kiem',
    value: new RegExp('/viec-lam/tim-kiem/.+$', 'i'),
  },

  // 16
  {
    id: '/recuiter/apply-jobs',
    value: new RegExp('/recuiter/apply-jobs$', 'i'),
  },

  // 17
  {
    id: '/recuiter/apply-jobs',
    value: new RegExp('/recuiter/apply-jobs/.+$', 'i'),
  },

  // 18
  {
    id: '/candidate/apply-jobs',
    value: new RegExp('/candidate/apply-jobs$', 'i'),
  },

  // 19
  {
    id: '/thiet-lap-thong-bao-viec-lam',
    value: new RegExp('/thiet-lap-thong-bao-viec-lam$', 'i'),
  },

  // 20
  {
    id: '/cong-viec-yeu-thich',
    value: new RegExp('/cong-viec-yeu-thich$', 'i'),
  },

  // 21
  {
    id: '/candidate/cv-beauty',
    value: new RegExp('/candidate/cv-beauty', 'i'),
  },
]

/**
 * Pick list menu ids from array of numbers
 *
 * @param {Array} array
 */
export const pickId = (array = []) => {
  if (!array.length) {
    return LIST_ROUTES
  }

  const ids = array.map((order) => {
    return LIST_ROUTES[order]
  }).filter(id => id)
  return ids
}

export default {
  // All pages
  candidate: {
    id: 'candidate',
    name: 'candidate',
    pages: pickId([0, 1, 2, 3, 4, 5, 7, 13, 15, 18, 19, 20, 21]),
  },
  recuiter: {
    id: 'recuiter',
    name: 'recuiter',
    pages: pickId([0, 1, 6, 7, 8, 9, 10, 11, 2, 12, 13, 14, 15, 16, 17]),
  },
}
