import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'
import { format } from '../../utils'
// import { format } from '../../utils'


const schema = new Schema({
  searchString: {
    type: String,
  },
  overviewInfo: {
    desiredLocation: String,
    currentRank: String,
    desiredRank: String,
    desiredCareer: {
      type: Schema.Types.ObjectId,
      ref: 'CareerGroup',
    },
    desiredCity: String,
    aducation: String,
    totalYearExperience: String,
    workMode: String,
    minimumWage: Number,
    careerGoal: String,
  },

  workExperiences: [{
    company: String,
    title: String, // Chuc danh
    workTimeStartAt: Date,
    workTimeEndAt: Date,
    wage: Number,
    jobDescription: String,
    achievements: String,
  }],

  qualifications: [{
    certificate: String,
    unit: String,
    from: Date,
    come: Date,
    specialized: String,
    graduationType: String,
    acttachment: String,
  }],

  foreignLanguages: [{
    typeLanguage: String,
    listen: String,
    speak: String,
    read: String,
    write: String,
  }],

  forteSkill: {
    mainSkill: [String],
    otherSkill: String,
  },

  computerLiteracy: {
    word: String,
    excel: String,
    powerPoint: String,
    Outlook: String,
    other: String,
  },

  approvedAt: Date,
  rejectedAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: 'pending',
  },
  isUse: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isSearch: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
})

/**
 * Static functions
 */
schema.statics = statics

// Pre save hook
schema.pre('validate', function (next) {
  this.searchString = format.nonAccentVietnamese(this.overviewInfo.desiredLocation)
  next()
})

/**
 * Export
 */
export default mongoose.model('CV', schema)
