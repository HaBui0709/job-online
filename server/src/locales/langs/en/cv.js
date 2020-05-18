import key from '../../key'
import { targetRequired, targetInvalid, targetNotFound } from '../helper'
import configs from '../../../configs'

const LOCALE_EN = configs.locales.en

export default {
  // Overview infomation
  [key.cv.desiredCareerInvalid]: targetInvalid('Ngành nghề mong muốn', LOCALE_EN),
  [key.cv.cvOverviewInfoRequired]: targetRequired('Thông tin tổng quan', LOCALE_EN),
  [key.cv.desiredLocationRequired]: targetRequired('Vị trí mong muốn', LOCALE_EN),
  [key.cv.currentRankRequired]: targetRequired('Cấp bậc hiện tại', LOCALE_EN),
  [key.cv.desiredCareerRequired]: targetRequired('Ngành nghề mong muốn', LOCALE_EN),
  [key.cv.desiredCityRequired]: targetRequired('Địa điểm mong muốn', LOCALE_EN),
  [key.cv.aducationRequired]: targetRequired('Trình độ học vấn cao nhất', LOCALE_EN),
  [key.cv.totalYearExperienceRequired]: targetRequired('Tổng số năm kinh nghiệm', LOCALE_EN),
  [key.cv.workModeRequired]: targetRequired('Hình thức làm việc', LOCALE_EN),
  [key.cv.minimumWageInvalid]: targetInvalid('Mong muốn mức lương tối thiểu', LOCALE_EN),
  [key.cv.minimumWageRequired]: targetRequired('Mong muốn mức lương tối thiểu', LOCALE_EN),
  [key.cv.careerGoalRequired]: targetRequired('Mục tiêu nghề nghiệp', LOCALE_EN),
  [key.cv.desiredRankRequired]: targetInvalid('Cấp bậc mong muốn', LOCALE_EN),

  // work experience
  [key.cv.workExperiencesMustBeAArray]: 'Kinh nghiệm làm việc phải là kiểu mảng',

  [key.cv.companyRequired]: targetRequired('Tên công ty/ tổ chức', LOCALE_EN),
  [key.cv.titleRequired]: targetRequired('Chức danh', LOCALE_EN),
  [key.cv.workTimeStartAtInvalid]: targetInvalid('Thời gian làm việc bắt đầu', LOCALE_EN),
  [key.cv.workTimeStartAtRequired]: targetRequired('Thời gian làm việc bắt đầu', LOCALE_EN),
  [key.cv.workTimeEndAtInvalid]: targetInvalid('Thời gian làm việc kết thúc', LOCALE_EN),
  [key.cv.workTimeEndAtRequired]: targetRequired('Thời gian làm việc kết thúc', LOCALE_EN),
  [key.cv.wageInvalid]: targetInvalid('Mức lương', LOCALE_EN),
  [key.cv.jobDescriptionRequired]: targetRequired('Mô tả công việc', LOCALE_EN),
  [key.cv.workExperiencesInvalid]: targetInvalid('Kinh nghiệm làm việc', LOCALE_EN),

  // Qualifications
  [key.cv.certificateRequired]: targetRequired('Tên bằng cấp/ chứng chỉ', LOCALE_EN),
  [key.cv.unitRequired]: targetRequired('Trường/ đơn vị cấp', LOCALE_EN),
  [key.cv.fromInvalid]: targetInvalid('Thời gian bắt đầu học', LOCALE_EN),
  [key.cv.fromRequired]: targetRequired('Thời gian bắt đầu học', LOCALE_EN),
  [key.cv.comeInvalid]: targetInvalid('Thời gian kết thúc học', LOCALE_EN),
  [key.cv.comeRequired]: targetRequired('Thời gian kết thúc học', LOCALE_EN),
  [key.cv.specializedRequired]: targetRequired('Chuyên ngành', LOCALE_EN),
  [key.cv.graduationTypeRequired]: targetRequired('Loại tốt nghiệp', LOCALE_EN),
  [key.cv.qualificationsInvalid]: targetInvalid('Thông tin về trình độ bằng cấp', LOCALE_EN),
  [key.cv.qualificationsMustBeArray]: 'Thông tin về trình độ bằng cấp phải là kiểu mảng',

  [key.cv.cvNotFound]: targetNotFound('CV', LOCALE_EN),
  [key.cv.pdtError]: 'CV PDF Error',
  [key.cv.cvIsApplied]: 'Hồ sơ xin việc của bạn đã được nộp vào tin tuyển dụng này trước đây rồi!',
}
