import connectDb from './db'
import { validateCode } from '../locales'

export default async () => {
  await connectDb()
  require('../model')
  validateCode()
}
