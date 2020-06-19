import { UserModel } from '../model'
import configs from '../configs'
import { to } from '../utils'

const run = async () => {
  const { data } = await to(UserModel.countDocuments({ role: configs.roles.admin }))
  if (data) {
    // console.log('ACCOUNT ADMIN is adready created')
  } else if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    console.log('The information to initialize the admin account is not ready yet')
  } else {
    const user = new UserModel({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      role: configs.roles.admin,
    })
    const { error } = await to(user.save())
    if (!error) {
      console.log('ACCOUNT ADMIN was init successfully')
    } else {
      console.log('ADMIN SUCCESSFULLY!')
    }
  }
}

run()
