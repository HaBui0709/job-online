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
    [key.login]: 'Login',
    [key.areYouAccount]: 'Do you already have an account?',
    [key.password]: 'Password',
    [key.invalidConfirmPassword]: 'Does not match the password!',

    // Login choose
    [key.candidateList1]: 'Hundreds of thousands of jobs are employed',
    [key.candidateList2]: 'Create a quick online profile',
    [key.candidateList3]: 'Thousands of employers find you',
    [key.candidateLogin]: 'CANDIDATE LOGIN',
    [key.recuiterList1]: 'Post free recruitment information',
    [key.recuiterList2]: 'Search for hundreds of thousands of candidates',
    [key.recuiterList3]: 'Smart recruitment management system',
    [key.recuiterLogin]: 'RECUITER LOGIN',
    [key.textIsAccount]: 'You do not have an account?',
    [key.candidateRegister]: 'CANDIDATE REGISTER',
    [key.register]: 'Register',
    [key.recuiterRegister]: 'RECUITER REGISTER',

    [key.invalidPhone]: 'Invalid Phone!',
    [key.facebook]: 'Facebook',
  },
  // menu namespace
  [key.menu]: {
    [key.menuGames]: 'Games',
    [key.menuConfiguration]: 'Configuration',
    [key.menuUser]: 'Users',
    [key.menuAgencies]: 'Agencies',
  },
}
