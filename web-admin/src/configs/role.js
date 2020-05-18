// Add more routes to the end of this array, do not modify this array order
const LIST_ROUTES = [
  // 1
  {
    id: 'users',
    value: new RegExp('/users$', 'i'),
  },

  // 2
  {
    id: 'users',
    value: new RegExp('/users/.+$', 'i'),
  },

  // 3
  {
    id: '404',
    value: new RegExp('/404$', 'i'),
  },

  // 4
  {
    id: 'career-groups',
    value: new RegExp('/career-groups$', 'i'),
  },

  // 5
  {
    id: 'career-groups',
    value: new RegExp('/career-groups/.+$', 'i'),
  },

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
    id: 'cvs',
    value: new RegExp('/cvs$', 'i'),
  },

  // 9
  {
    id: 'cvs',
    value: new RegExp('/cvs/.+$', 'i'),
  },

  // 10
  {
    id: 'statistic',
    value: new RegExp('/statistic$', 'i'),
  },

  // 11
  {
    id: 'statistic',
    value: new RegExp('/statistic/.+$', 'i'),
  },

  // 12
  {
    id: 'businesses',
    value: new RegExp('/businesses/.+$', 'i'),
  },

  // 13
  {
    id: 'businesses',
    value: new RegExp('/businesses$', 'i'),
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
  admin: {
    id: 'admin',
    name: 'Admin',
    pages: pickId(),
  },
}
