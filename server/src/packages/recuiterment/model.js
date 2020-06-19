import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'
import { format } from '../../utils'

const schema = new Schema({
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
    default: '',
  },
  jobRequirements: {
    type: String,
    default: '',
  },
  benefit: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    default: 1,
  },
  gender: {
    type: String,
    default: 'all',
  },
  workMode: {
    type: String,
    default: '',
  },
  jobPosition: {
    type: String,
    default: '',
  },
  experience: {
    type: String,
  },
  salary: {
    key: String,
    value: {
      from: Number,
      to: Number,
    },
    name: String,
  },
  careers: [Schema.Types.ObjectId],
  degreeRequirement: {
    type: String,
  },
  city: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  searchString: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  cover: String,
  approvedAt: Date,
  completedAt: Date,
  rejectedAt: Date,
}, {
  versionKey: false,
})


/**
 * Static functions
 */
schema.statics = statics

// Pre save hook
schema.pre('validate', function (next) {
  this.searchString = format.nonAccentVietnamese(this.title)
  next()
})

/**
 * Export
 */
export default mongoose.model('Recuiterment', schema)
