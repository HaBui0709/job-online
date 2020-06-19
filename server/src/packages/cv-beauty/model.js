import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  typeCV: {
    type: String,
  },
  cv: {
    type: Schema.Types.ObjectId,
    ref: 'CV',
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
  collections: 'cv-beauty',
})


/**
 * Static functions
 */
schema.statics = statics

/**
 * Export
 */
export default mongoose.model('CVBeauty', schema)
