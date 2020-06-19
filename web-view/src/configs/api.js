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
  // endpoint: 'http://139.180.139.146:5070',

  // End point server upload
  endpointUpload: 'http://localhost:5900',

  googleMaps: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places&region=VN&language=vi`,
  methods: METHODS,

  // COMMON
  common: {
    loginCandidate: () => ({
      url: '/login/candidate',
      method: METHODS.post,
    }),
    loginRecuiter: () => ({
      url: '/login/recuiter',
      method: METHODS.post,
    }),
    registerCandidate: () => ({
      url: '/register/candidate',
      method: METHODS.post,
    }),
    registerRecuiter: () => ({
      url: '/register/recuiter',
      method: METHODS.post,
    }),
    checkIsExistCV: () => ({
      url: '/check/cv',
      method: METHODS.get,
    }),
  },

  // ME
  me: {
    userInfo: () => ({
      url: '/me',
      method: METHODS.get,
    }),
  },
  // SEARCH
  search: {
    user: () => ({
      url: '/search/users',
      method: METHODS.get,
    }),
    careerGroup: () => ({
      url: '/search/career-groups',
      method: METHODS.get,
    }),
    jobs: () => ({
      url: '/search/search-jobs',
      method: METHODS.get,
    }),
  },

  // cv
  cv: {
    create: () => ({
      url: '/candidate/cv',
      method: METHODS.post,
    }),
    all: () => ({
      url: '/candidate/cv',
      method: METHODS.get,
    }),
    show: _id => ({
      url: `/candidate/cv/${_id}`,
      method: METHODS.get,
    }),
    getCVApproved: () => ({
      url: '/candidate/cv/approved',
      method: METHODS.get,
    }),
    delete: _id => ({
      url: `/candidate/cv/${_id}`,
      method: METHODS.delete,
    }),
  },

  // Recuiterment
  recuiterment: {
    create: () => ({
      url: '/recuiterments',
      method: METHODS.post,
    }),
    all: () => ({
      url: '/recuiterments',
      method: METHODS.get,
    }),
    showJobPosting: _id => ({
      url: `/recuiterments/${_id}/posting`,
      method: METHODS.get,
    }),
    allApproved: () => ({
      url: '/recuiterments/approved',
      method: METHODS.get,
    }),
    fetchDetailRecuitermentApproved: () => ({
      url: '/recuiterments/approved',
      method: METHODS.get,
    }),
    similar: _id => ({
      url: `/recuiterments/${_id}/similar-jobs`,
      method: METHODS.get,
    }),
  },

  // Account
  account: {
    update: _id => ({
      url: `/users/${_id}`,
      method: METHODS.put,
    }),
    changeAvatar: _id => ({
      url: `/users/${_id}/avatar`,
      method: METHODS.patch,
    }),
  },

  // Business
  business: {
    show: _id => ({
      url: `/business/${_id}`,
      method: METHODS.get,
    }),
    update: _id => ({
      url: `/business/${_id}`,
      method: METHODS.put,
    }),
    changeLogo: _id => ({
      url: `/business/${_id}/logo`,
      method: METHODS.patch,
    }),
    all: () => ({
      url: '/business',
      method: METHODS.get,
    }),
    showViewWeb: _id => ({
      url: `/business/${_id}/view-web`,
      method: METHODS.get,
    }),
    fecthAllJobs: _id => ({
      url: `/business/${_id}/jobs`,
      method: METHODS.get,
    }),
  },

  // HOME
  home: {
    jobsInterestring: () => ({
      url: '/home/jobs-iteresting',
      method: METHODS.get,
    }),
    fetchJobUrgent: () => ({
      url: '/home/jobs-urgent',
      method: METHODS.get,
    }),
    fetchJobSuggest: () => ({
      url: '/home/job-suggests',
      method: METHODS.get,
    }),
    fetchNewJobs: () => ({
      url: '/home/jobs-new',
      method: METHODS.get,
    }),
  },

  applies: {
    applyJob: () => ({
      url: '/apply-jobs',
      method: METHODS.post,
    }),
    fetchDetail: () => ({
      url: '/apply-jobs/manager-candidate',
      method: METHODS.get,
    }),
    changeStatusAndNotification: _id => ({
      url: `/apply-jobs/${_id}/approved`,
      method: METHODS.patch,
    }),
    allApplyJobsByCandidate: () => ({
      url: '/apply-jobs/for-candidate',
      method: METHODS.get,
    }),
  },

  // UPLOAD
  upload: {
    photos: () => ({
      url: '/photos',
      method: METHODS.post,
    }),
    files: () => ({
      url: '/files',
      method: METHODS.post,
    }),
    images: () => ({
      url: '/images',
      method: METHODS.post,
    }),
    delete: _id => ({
      url: `/files/${_id}`,
      method: METHODS.delete,
    }),
  },

  // NOTIFICATIONS
  notifications: {
    show: () => ({
      url: '/notifications/show-by-user',
      method: METHODS.get,
    }),
    create: () => ({
      url: '/notifications',
      method: METHODS.post,
    }),
    delete: () => ({
      url: '/notifications',
      method: METHODS.delete,
    }),
  },

  candidate: {
    saveFavorite: () => ({
      url: '/favorite-histories',
      method: METHODS.post,
    }),
    allFavoriteHistories: () => ({
      url: '/favorite-histories',
      method: METHODS.get,
    }),
    deleteFavoriteHistory: _id => ({
      url: `/favorite-histories/${_id}`,
      method: METHODS.delete,
    }),
  },

  cvBeauty: {
    all: () => ({
      url: '/cv-beauty',
      method: METHODS.get,
    }),

    saveCVBeauty: () => ({
      url: '/cv-beauty',
      method: METHODS.post,
    }),

    previewCVBeauty: _id => ({
      url: `/pdf/${_id}/link-download/cv`,
      method: METHODS.get,
    }),

    deleteCVBeauty: _id => ({
      url: `/cv-beauty/${_id}`,
      method: METHODS.delete,
    }),

  },
}
