import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'
import { format } from '../../utils'

const schema = new Schema({
  name: {
    type: String,
  },
  searchString: {
    type: String,
    default: '',
  },
  children: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: false,
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
  collections: 'career-groups',
})


/**
 * Static functions
 */
schema.statics = statics

// Pre save hook
schema.pre('validate', function (next) {
  this.searchString = format.nonAccentVietnamese(this.name)
  next()
})

/**
 * Export
 */
export default mongoose.model('CareerGroup', schema)
