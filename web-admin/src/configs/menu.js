import { key } from '../configs/locale'

const Menus = [{
  id: 'users',
  name: key.menuUser,
  icon: 'user',
}, {
  id: 'career-groups',
  name: key.menuCareerGroup,
  icon: 'book',
}, {
  id: 'recuiterments',
  name: key.menuRecuiterment,
  icon: 'rocket',
}, {
  id: 'cvs',
  name: key.menuCV,
  icon: 'file-search',
}, {
  id: 'businesses',
  name: key.menuBusinesses,
  icon: 'shop',
}]

// {
//   id: 'statistic',
//   name: key.menyStatistic,
//   icon: 'bar-chart',
// },
/**
 * Pick list menu ids from array of numbers
 *
 * @param {Array} array
 */
export const pickId = (array = []) => {
  if (!array.length) {
    return Menus
  }

  const ids = array.map((order) => {
    return Menus[order]
  }).filter(id => id)
  return ids
}

export default {
  // All pages
  admin: {
    id: 'admin',
    pages: pickId(),
  },
}
