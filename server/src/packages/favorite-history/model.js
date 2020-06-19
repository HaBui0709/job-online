import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  recuiterment: {
    type: Schema.Types.ObjectId,
    ref: 'Recuiterment',
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
  collections: 'favoriteHistories',
})


/**
 * Static functions
 */
schema.statics = statics

/**
 * Export
 */
export default mongoose.model('FavoriteHistory', schema)
