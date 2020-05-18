import { mongoose, Schema } from '../../utils/mongoose'
import funcStatic from './static-func'

const schema = new Schema({
  // Author of file
  author: Schema.Types.ObjectId,

  // File name
  name: String,

  // Original name
  originalName: String,

  // Extension
  ext: String,

  // Dimensions
  dimensions: Schema.Types.Mixed,

  // Public status
  public: {
    type: Boolean,
    default: false,
  },

  // Active status
  active: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
  collection: 'v3-files',
})

/**
 * Static
 */
schema.statics = {
  ...funcStatic,
}

// Export
export default mongoose.model('File', schema)
