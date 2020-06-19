import { Schema, mongoose } from '../../utils/mongoose'
import configs from '../../configs'
import statics from './static'
import { localesKey } from '../../locales'
import { format } from '../../utils'

const locationType = configs.geoPoint.type

const schema = new Schema({
  name: {
    type: String,
    required: [true, localesKey.business.nameRequired],
  },
  searchString: {
    type: String,
    default: '',
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  desc: String,
  city: {
    type: String,
  },
  address: {
    type: String,
    default: '',
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  covers: [String],
  active: {
    type: Boolean,
    default: true,
  },
  location: {
    type: {
      type: String,
      default: locationType,
      enum: [locationType], // location must be 'Point'
    },
    coordinates: [Number],
  },
  phone: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  mapAddress: {
    type: String,
    default: '',
  },
  addressComponents: [{
    country: {
      name: {
        type: String,
      },
      id: {
        type: String,
      },
    },
    city: {
      name: {
        type: String,
      },
      id: {
        type: String,
      },
    },
    district: {
      name: {
        type: String,
      },
      id: {
        type: String,
      },
    },
  }],
  scale: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
  },
  logoHeader: {
    type: String,
    default: '',
  },
  wefare: {
    reward: String,
    pantry: String,
    absentDay: String,
    activities: String,
    educate: String,
    healthCare: String,
  },
}, {
  versionKey: false,
})

schema.index({ location: '2dsphere' })

/**
 * Static functions
 */
schema.statics = statics

// Pre save hook
schema.pre('validate', function (next) {
  this.searchString = format.nonAccentVietnamese(this.name)
  this.phone = format.phone(this.phone)
  next()
})

/**
 * Export
 */
export default mongoose.model('Business', schema)
