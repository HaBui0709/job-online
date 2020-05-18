import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'

const schema = new Schema({
  recuiterment: {
    type: Schema.Types.ObjectId,
    ref: 'Recuiterment',
  },
  cv: {
    type: Schema.Types.ObjectId,
    ref: 'CV',
  },
  status: {
    type: String,
    default: 'pending',
  },
  notification: {
    title: String,
    message: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: Date,
  rejectedAt: Date,
}, {
  versionKey: false,
  collections: 'apply-jobs',
})


/**
 * Static functions
 */
schema.statics = statics

/**
 * Export
 */
export default mongoose.model('ApplyJob', schema)
