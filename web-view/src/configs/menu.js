// import { key } from './locale'

const Menus = []

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
  candidate: {
    id: 'candidate',
    pages: pickId(),
  },
}
