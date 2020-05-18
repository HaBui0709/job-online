import crypto from 'crypto'
import { Schema, mongoose } from '../../utils/mongoose'
import config from '../../configs'
import statics from './static'
import { localesKey } from '../../locales'
import { format } from '../../utils'

// const uniqueValidator = require('mongoose-unique-validator')

const userKey = localesKey.user

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, userKey.userNameIsRequire],
    maxlength: [config.validation.user.maxNameLength, userKey.userNameLenghtMustBeLessThan128Chars],
  },
  hashedPassword: String,
  salt: String,
  role: String,
  admin: {
    role: {
      type: String,
      enum: [
        config.roles.admin,
        config.roles.manager,
      ],
    },
    city: {
      type: String,
      default: '',
    },
  },
  avatar: {
    type: String,
    default: '',
  },
  fullName: {
    type: String,
  },
  city: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  plasticCard: {
    type: String,
    default: '',
  },
  isNewUser: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    unique: true,
    default: '',
  },
  facebook: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true,
  },
  statuses: {
    verified: {
      type: Boolean,
      default: true,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  searchString: {
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
  gender: {
    type: String,
    default: '',
  },
  isLocalExpert: {
    type: Boolean,
    default: false,
  },
  business: Schema.Types.Mixed,
}, {
  collection: 'users',
  versionKey: false,
})

// Check unique
// schema.plugin(uniqueValidator, { message: localesKey.user['{PATH}IsExisted'] })

/**
 * Virtual
 */
schema.virtual('password').set(function (password) {
  this._password = password
  this.salt = this.makeSalt()
  this.hashedPassword = this.hashPassword(password)
}).get(function () {
  return this._password
})

/**
 * Methods
 */
schema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   */
  authenticate(plainText) {
    return this.hashPassword(plainText) === this.get('hashedPassword')
  },

  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt() {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Hash password
   *
   * @param {String} password
   */
  hashPassword(password) {
    if (!password || !this.get('salt')) return ''
    const salt = Buffer.from(this.get('salt'), 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
  },
}

schema.statics = statics

/**
 * Presave hook
 */
schema.pre('save', function (next) {
  // XSS name
  this.name = format.xssString(this.name)
  this.phone = format.phone(this.phone)
  this.searchString = format.nonAccentVietnamese(this.fullName)
  next()
})

export default mongoose.model('User', schema)
