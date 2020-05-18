import key from '../../key'
import { targetRequired, targetInvalid, targetNotFound } from '../helper'
import configs from '../../../configs'

const LOCALE_EN = configs.locales.en

export default {
  [key.recuiterment.recuitermentTitleRequired]: targetRequired('Tiêu đề tuyển dụng', LOCALE_EN),
  [key.recuiterment.recuitermentDescRequired]: targetRequired('Mô tả công việc', LOCALE_EN),
  [key.recuiterment.recuitermentJobRequirementRequired]: targetRequired('Yêu cầu công việc', LOCALE_EN),
  [key.recuiterment.recuitermentBenefitRequired]: targetRequired('Quyền lợi', LOCALE_EN),
  [key.recuiterment.recuitermentQuantityInvalid]: targetInvalid('Số lượng tuyển', LOCALE_EN),
  [key.recuiterment.recuitermentQuantityRequired]: targetInvalid('Số lượng tuyển', LOCALE_EN),
  [key.recuiterment.recuitermentGenderRequired]: targetInvalid('Yêu cầu giới tính', LOCALE_EN),
  [key.recuiterment.recuitermentWorkModeRequired]: targetRequired('Yêu cầu hình thức làm việc', LOCALE_EN),
  [key.recuiterment.recuitermentWorkLocaitonRequired]: targetRequired('Nơi làm việc', LOCALE_EN),
  [key.recuiterment.recuitermentExperienceRequired]: targetRequired('Kinh nghiệm làm việc', LOCALE_EN),
  [key.recuiterment.recuitermentSalaryRequired]: targetRequired('Mức lương', LOCALE_EN),

  [key.recuiterment.recuitermentCareerItemInvalid]: targetInvalid('Ngành nghề ', LOCALE_EN),
  [key.recuiterment.recuitermentCareersMustBeArray]: 'Ngành nghề phải là mảng array',
  [key.recuiterment.recuitermentCareersRequired]: targetRequired('Ngành nghề', LOCALE_EN),

  [key.recuiterment.recuitermentDegreeRequirementRequired]: targetRequired('Yêu cầu bằng cấp', LOCALE_EN),
  [key.recuiterment.recuitermentPositionRequired]: targetRequired('Vị trí', LOCALE_EN),

  [key.recuiterment.recuitermentDeadlineInvalid]: targetInvalid('Deadline', LOCALE_EN),
  [key.recuiterment.recuitermentDeadlineRequired]: targetRequired('Deadline', LOCALE_EN),
  [key.recuiterment.recuitermentNotFound]: targetNotFound('Recuiterment', LOCALE_EN),
}
