import key from '../../key'
import { targetRequired, targetInvalid, targetNotFound } from '../helper'
import configs from '../../../configs'

const LOCALE_VI = configs.locales.vi

export default {

  // Overview infomation
  [key.cv.desiredCareerInvalid]: targetInvalid('Ngành nghề mong muốn', LOCALE_VI),
  [key.cv.cvOverviewInfoRequired]: targetRequired('Thông tin tổng quan', LOCALE_VI),
  [key.cv.desiredLocationRequired]: targetRequired('Vị trí mong muốn', LOCALE_VI),
  [key.cv.currentRankRequired]: targetRequired('Cấp bậc hiện tại', LOCALE_VI),
  [key.cv.desiredCareerRequired]: targetRequired('Ngành nghề mong muốn', LOCALE_VI),
  [key.cv.desiredCityRequired]: targetRequired('Địa điểm mong muốn', LOCALE_VI),
  [key.cv.aducationRequired]: targetRequired('Trình độ học vấn cao nhất', LOCALE_VI),
  [key.cv.totalYearExperienceRequired]: targetRequired('Tổng số năm kinh nghiệm', LOCALE_VI),
  [key.cv.workModeRequired]: targetRequired('Hình thức làm việc', LOCALE_VI),
  [key.cv.minimumWageInvalid]: targetInvalid('Mong muốn mức lương tối thiểu', LOCALE_VI),
  [key.cv.minimumWageRequired]: targetRequired('Mong muốn mức lương tối thiểu', LOCALE_VI),
  [key.cv.careerGoalRequired]: targetRequired('Mục tiêu nghề nghiệp', LOCALE_VI),
  [key.cv.desiredRankRequired]: targetRequired('Cấp bậc mong muốn', LOCALE_VI),

  // Work experience
  [key.cv.workExperiencesMustBeAArray]: 'Kinh nghiệm làm việc phải là kiểu mảng',

  [key.cv.companyRequired]: targetRequired('Tên công ty/ tổ chức', LOCALE_VI),
  [key.cv.titleRequired]: targetRequired('Chức danh', LOCALE_VI),
  [key.cv.workTimeStartAtInvalid]: targetInvalid('Thời gian làm việc bắt đầu', LOCALE_VI),
  [key.cv.workTimeStartAtRequired]: targetRequired('Thời gian làm việc bắt đầu', LOCALE_VI),
  [key.cv.workTimeEndAtInvalid]: targetInvalid('Thời gian làm việc kết thúc', LOCALE_VI),
  [key.cv.workTimeEndAtRequired]: targetRequired('Thời gian làm việc kết thúc', LOCALE_VI),
  [key.cv.wageInvalid]: targetInvalid('Mức lương', LOCALE_VI),
  [key.cv.jobDescriptionRequired]: targetRequired('Mô tả công việc', LOCALE_VI),
  [key.cv.workExperiencesInvalid]: targetInvalid('Kinh nghiệm làm việc', LOCALE_VI),

  // Qualifications
  [key.cv.certificateRequired]: targetRequired('Tên bằng cấp/ chứng chỉ', LOCALE_VI),
  [key.cv.unitRequired]: targetRequired('Trường/ đơn vị cấp', LOCALE_VI),
  [key.cv.fromInvalid]: targetInvalid('Thời gian bắt đầu học', LOCALE_VI),
  [key.cv.fromRequired]: targetRequired('Thời gian bắt đầu học', LOCALE_VI),
  [key.cv.comeInvalid]: targetInvalid('Thời gian kết thúc học', LOCALE_VI),
  [key.cv.comeRequired]: targetRequired('Thời gian kết thúc học', LOCALE_VI),
  [key.cv.specializedRequired]: targetRequired('Chuyên ngành', LOCALE_VI),
  [key.cv.graduationTypeRequired]: targetRequired('Loại tốt nghiệp', LOCALE_VI),
  [key.cv.qualificationsInvalid]: targetInvalid('Thông tin về trình độ bằng cấp', LOCALE_VI),
  [key.cv.qualificationsMustBeArray]: 'Thông tin về trình độ bằng cấp phải là kiểu mảng',

  [key.cv.cvNotFound]: targetNotFound('CV', LOCALE_VI),
  [key.cv.pdtError]: 'CV PDF Error',
  [key.cv.cvIsApplied]: 'Hồ sơ xin việc của bạn đã được nộp vào tin tuyển dụng này trước đây rồi!',
}
