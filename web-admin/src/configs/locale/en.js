import key from './key'
import ComponentConst from '../component'

export default {
  // translations namespace, can add more namespace  below this namespace
  [key.translations]: {
    [key.confirm]: 'Confirm',
    [key.cancel]: 'Cancel',
    [key.search]: 'Search',
    [key.error404]: '404',
    [key.titleError404]: 'Sorry Page Not Found !',
    [key.goHome]: 'Go Home',
    [key.ok]: 'Ok',
    [key.nameIsRequired]: 'Name Is Required',
    [key.passwordIsRequired]: 'Password Is Required',
    [key.passwordMinLength]: `Name length must be greater than ${ComponentConst.common.validation.passwordMinLength} characters`,
    [key.next]: 'Next',
    [key.prev]: 'Prev',
    [key.delete]: 'Delete',
    [key.update]: 'Update',
    [key.create]: 'Create',
    [key.allFieldsRequired]: 'Please fill all of fields',
    [key.detail]: 'Detail',
    [key.createdAt]: 'Created At',
    [key.updatedAt]: 'Updated At',
    [key.deleteConfirm]: 'Are you sure delete this jackpot?',
    [key.action]: 'Action',
    [key.agencyType]: 'Agency',
    [key.positiveInteger]: 'Please enter a positive integer',
    [key.titleEmail]: 'Email',
    [key.titlePhone]: 'Phone',
    [key.titleAvatar]: 'Avatar',
    [key.titleCity]: 'City',
    [key.verified]: 'Verified',
    [key.changeStatus]: 'Change status',
    [key.status]: 'Status',
    [key.titleRole]: 'User type',
  },
  // menu namespace
  [key.menu]: {
    [key.menuUser]: 'Users',
    [key.menuCareerGroup]: 'Career groups',
    [key.menuRecuiterment]: 'Menu recuiterments',
    [key.menuCV]: 'CVs',
    [key.menyStatistic]: 'Statistic',
    [key.menuBusinesses]: 'Businesses',
  },
  // Users
  [key.users]: {
    [key.placeholderSearchUser]: 'Name |Email| Phone',
    [key.username]: 'Username',
    [key.fullName]: 'Full name',
    [key.typeOfUser]: 'Type',
    [key.signUp]: 'Sign up',
    [key.birthday]: 'Birthday',
    [key.gender]: 'Gender',
    [key.facebook]: 'Facebook',
    [key.titleUnban]: 'Unban',
    [key.titleBan]: 'Ban',
    [key.titleConfirmPhone]: 'Confirm phone',
    [key.phoneIsRequired]: 'Phone is required',
    [key.titleCurriculumVitaes]: 'Curriculum vitaes',
    [key.titleSubmissionHistories]: 'Submission histories',
    [key.titleFollowing]: 'Following',
    [key.titleConfirmBan]: 'Are you sure you want to lock this account?',
    [key.titleConfirmUnban]: 'Are you sure you want to unlock this account?',
  },

  // CAREER GROUP
  [key.careerGroups]: {
    [key.createCareerGroup]: 'Create career group',
    [key.titleName]: 'Name',
    [key.nameCareerGroup]: 'Career group name',
    [key.children]: 'Children',
    [key.unavailability]: 'Unavailability',
    [key.availability]: 'Availability',
    [key.titleStatus]: 'Status',
    [key.updateCareerGroup]: 'Update career group',
  },

  // Recuiterments
  [key.recuiterment]: {
    [key.titleRecuiterment]: 'Title',
    [key.titleBusiness]: 'Business',
    [key.countUserApply]: 'User apply',
    [key.deadline]: 'Deadline',
    [key.titleRecuiter]: 'Author',
  },

  // CV
  [key.cv]: {
    [key.titleNameUser]: 'Name',
    [key.desiredLocation]: 'Desired job',
    [key.desiredCareer]: 'Career',
    [key.minimumWage]: 'Minimum wage',
  },

  // Businesses
  [key.business]: {
    [key.titleBusinessName]: 'Name',
    [key.listRecuiterments]: 'List recuiterments',
    [key.position]: 'Job position',
  },
}
