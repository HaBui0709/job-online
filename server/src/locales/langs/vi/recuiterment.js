import key from '../../key'
import { targetRequired, targetInvalid, targetNotFound } from '../helper'
import configs from '../../../configs'

const LOCALE_VI = configs.locales.vi

export default {
  [key.recuiterment.recuitermentTitleRequired]: targetRequired('Tiêu đề tuyển dụng', LOCALE_VI),
  [key.recuiterment.recuitermentDescRequired]: targetRequired('Mô tả công việc', LOCALE_VI),
  [key.recuiterment.recuitermentJobRequirementRequired]: targetRequired('Yêu cầu công việc', LOCALE_VI),
  [key.recuiterment.recuitermentBenefitRequired]: targetRequired('Quyền lợi', LOCALE_VI),
  [key.recuiterment.recuitermentQuantityInvalid]: targetInvalid('Số lượng tuyển', LOCALE_VI),
  [key.recuiterment.recuitermentQuantityRequired]: targetInvalid('Số lượng tuyển', LOCALE_VI),
  [key.recuiterment.recuitermentGenderRequired]: targetInvalid('Yêu cầu giới tính', LOCALE_VI),
  [key.recuiterment.recuitermentWorkModeRequired]: targetRequired('Yêu cầu hình thức làm việc', LOCALE_VI),
  [key.recuiterment.recuitermentWorkLocaitonRequired]: targetRequired('Nơi làm việc', LOCALE_VI),
  [key.recuiterment.recuitermentExperienceRequired]: targetRequired('Kinh nghiệm làm việc', LOCALE_VI),
  [key.recuiterment.recuitermentSalaryRequired]: targetRequired('Mức lương', LOCALE_VI),

  [key.recuiterment.recuitermentCareerItemInvalid]: targetInvalid('Ngành nghề ', LOCALE_VI),
  [key.recuiterment.recuitermentCareersMustBeArray]: 'Ngành nghề phải là mảng array',
  [key.recuiterment.recuitermentCareersRequired]: targetRequired('Ngành nghề', LOCALE_VI),

  [key.recuiterment.recuitermentDegreeRequirementRequired]: targetRequired('Yêu cầu bằng cấp', LOCALE_VI),
  [key.recuiterment.recuitermentPositionRequired]: targetRequired('Vị trí', LOCALE_VI),


  [key.recuiterment.recuitermentDeadlineInvalid]: targetInvalid('Hạn nộp hồ sơ', LOCALE_VI),
  [key.recuiterment.recuitermentDeadlineRequired]: targetRequired('Hạn nộp hồ sơ', LOCALE_VI),
  [key.recuiterment.recuitermentNotFound]: targetNotFound('Tin tuyển dụng', LOCALE_VI),
}
