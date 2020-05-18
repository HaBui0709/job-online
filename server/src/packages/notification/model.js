import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  city: {
    type: String,
  },
  email: {
    type: String,
  },
  salary: {
    type: String,
  },
  experience: {
    type: String,
  },
  careers: [String],
  frequency: {
    type: String,
  },
  academicLevel: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
  collections: 'notifications',
})


/**
 * Static functions
 */
schema.statics = statics

/**
 * Export
 */
export default mongoose.model('Notification', schema)
