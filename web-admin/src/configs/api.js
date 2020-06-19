import AppConst from './app'

const METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
}
const { apiKey } = AppConst.googleMaps
export default {
  endpoint: 'http://localhost:5070',
  googleMaps: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places&region=VN&language=vi`,
  methods: METHODS,

  // COMMON
  common: {
    login: () => ({
      url: '/login',
      method: METHODS.post,
    }),
  },

  // ME
  me: {
    userInfo: () => ({
      url: '/me',
      method: METHODS.get,
    }),
  },

  // USERS
  users: {
    all: () => ({
      url: '/users',
      method: METHODS.get,
    }),
    show: _id => ({
      url: `/users/${_id}`,
      method: METHODS.get,
    }),
    changeBan: _id => ({
      url: `/users/${_id}/change-ban`,
      method: METHODS.patch,
    }),
  },

  // CareerGroups
  careerGroups: {
    all: () => ({
      url: '/career-groups',
      method: METHODS.get,
    }),
    create: () => ({
      url: '/career-groups',
      method: METHODS.post,
    }),
    update: _id => ({
      url: `/career-groups/${_id}`,
      method: METHODS.put,
    }),
    changeStatus: _id => ({
      url: `/career-groups/${_id}/status`,
      method: METHODS.patch,
    }),
  },

  recuiterments: {
    all: () => ({
      url: '/recuiterments',
      method: METHODS.get,
    }),
    show: _id => ({
      url: `/recuiterments/${_id}`,
      method: METHODS.get,
    }),
    changeStatus: _id => ({
      url: `/recuiterments/${_id}`,
      method: METHODS.patch,
    }),
  },
  cv: {
    all: () => ({
      url: '/cvs',
      method: METHODS.get,
    }),
    show: _id => ({
      url: `/candidate/cv/${_id}`,
      method: METHODS.get,
    }),
    changeStatus: _id => ({
      url: `/cvs/${_id}`,
      method: METHODS.patch,
    }),
  },

  analytic: {
    statisticChartByWeek: () => ({
      url: '/analytic/statistic-chart-by-week',
      method: METHODS.get,
    }),
    statisticChartByDay: () => ({
      url: '/analytic/statistic-chart-by-day',
      method: METHODS.get,
    }),
    recuiterment: () => ({
      url: '/analytic/recuiterments',
      method: METHODS.get,
    }),
  },

  businesses: {
    all: () => ({
      url: '/business/admin',
      method: METHODS.get,
    }),
    show: _id => ({
      url: `/business/${_id}/admin`,
      method: METHODS.get,
    }),
    fetchRecuiterments: _id => ({
      url: `/business/${_id}/recuiterments/admin`,
      method: METHODS.get,
    }),
  },
}
