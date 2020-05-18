// import moment from 'moment'

const LocalStoragePrefix = (process.env.NODE_ENV === 'production') ? 'job-view-' : 'job-view-dev-'

export default {
  name: 'JOB ONLINE',

  // Screen size
  screens: {
    'xs-max': 480,
    'sm-min': 481,
    'sm-max': 767,
    'md-min': 768,
    'md-max': 991,
    'lg-min': 992,
    'lg-max': 1199,
    'xl-min': 1200,
  },

  // Local storage
  localStorage: {
    authKey: `${LocalStoragePrefix}token`,
    roleKey: `${LocalStoragePrefix}role`,
    cityKey: `${LocalStoragePrefix}city`,
    userIdKey: `${LocalStoragePrefix}userId`,
    businessKey: `${LocalStoragePrefix}businessId`,
  },

  // Notification level
  notification: {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  },

  // Regex
  regex: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    objectId: /^[0-9a-fA-F]{24}$/,
    positiveInteger: /^[+]?\d*$/,
    phone: /^\+?1?(\d{10,12}$)/,
    time: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    percent: /^(^(100(?:\.0{1,2})?))|(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,
  },

  // Text mask
  textMask: {
    time: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
  },

  // Format
  format: {
    date: 'DD/MM/YYYY, HH:mm',
    dateWithNoHour: 'DD/MM/YYYY',
    dateWithDayMonthOnly: 'DD/MM',
    dateWithHour: 'H',
    dateWithMinute: 'm',
    month: 'MM/YYYY',
    inputNumberFormatter: /\B(?=(\d{3})+(?!\d))/g,
    inputNumberParser: /\$\s?|(,*)/g,
  },


  // Locales
  locale: {
    default: 'vi',
    list: [
      {
        description: 'Tiếng Việt',
        language: 'vi',
      }, {
        description: 'English',
        language: 'en',
      },
    ],
  },

  // City
  cities: {
    default: 'all',
    title: 'Thành phố',
    list: [{
      _id: 'all',
      name: 'Tất cả',
    }, {
      _id: 'lao-cai',
      name: 'Lào Cai',
    }, {
      _id: 'dien-bien',
      name: 'Điện Biên',
    }, {
      _id: 'lai-chau',
      name: 'Lai Châu',
    }, {
      _id: 'son-la',
      name: 'Sơn La',
    }, {
      _id: 'yen-bai',
      name: 'Yên Bái',
    }, {
      _id: 'hoa-binh',
      name: 'Hoà Bình',
    }, {
      _id: 'thai-nguyen',
      name: 'Thái Nguyên',
    }, {
      _id: 'lang-son',
      name: 'Lạng Sơn',
    }, {
      _id: 'quang-ninh',
      name: 'Quảng Ninh',
    }, {
      _id: 'bac-giang',
      name: 'Bắc Giang',
    }, {
      _id: 'phu-tho',
      name: 'Phú Thọ',
    }, {
      _id: 'vinh-phuc',
      name: 'Vĩnh Phúc',
    }, {
      _id: 'bac-ninh',
      name: 'Bắc Ninh',
    }, {
      _id: 'hai-duong',
      name: 'Hải Dương',
    }, {
      _id: 'hai-phong',
      name: 'Hải Phòng',
    }, {
      _id: 'hung-yen',
      name: 'Hưng Yên',
    }, {
      _id: 'thai-binh',
      name: 'Thái Bình',
    }, {
      _id: 'ha-nam',
      name: 'Hà Nam',
    }, {
      _id: 'nam-dinh',
      name: 'Nam Định',
    }, {
      _id: 'ninh-binh',
      name: 'Ninh Bình',
    }, {
      _id: 'thanh-hoa',
      name: 'Thanh Hóa',
    }, {
      _id: 'nghe-an',
      name: 'Nghệ An',
    }, {
      _id: 'ha-tinh',
      name: 'Hà Tĩnh',
    }, {
      _id: 'quang-binh',
      name: 'Quảng Bình',
    }, {
      _id: 'quang-tri',
      name: 'Quảng Trị',
    }, {
      _id: 'thua-thien-hue',
      name: 'Thừa Thiên Huế',
    }, {
      _id: 'da-nang',
      name: 'Đà Nẵng',
    }, {
      _id: 'quang-nam',
      name: 'Quảng Nam',
    }, {
      _id: 'quang-ngai',
      name: 'Quảng Ngãi',
    }, {
      _id: 'binh-dinh',
      name: 'Bình Định',
    }, {
      _id: 'phu-yen',
      name: 'Phú Yên',
    }, {
      _id: 'khanh-hoa',
      name: 'Khánh Hòa',
    }, {
      _id: 'ninh-thuan',
      name: 'Ninh Thuận',
    }, {
      _id: 'binh-thuan',
      name: 'Bình Thuận',
    }, {
      _id: 'kon-tum',
      name: 'Kon Tum',
    }, {
      _id: 'gia-lai',
      name: 'Gia Lai',
    }, {
      _id: 'dak-lak',
      name: 'Đắk Lắk',
    }, {
      _id: 'dak-nong',
      name: 'Đắk Nông',
    }, {
      _id: 'lam-dong',
      name: 'Lâm Đồng',
    }, {
      _id: 'binh-phuoc',
      name: 'Bình Phước',
    }, {
      _id: 'tay-ninh',
      name: 'Tây Ninh',
    }, {
      _id: 'binh-duong',
      name: 'Bình Dương',
    }, {
      _id: 'dong-nai',
      name: 'Đồng Nai',
    }, {
      _id: 'ba-ria-vung-tau',
      name: 'Bà Rịa - Vũng Tàu',
    }, {
      _id: 'ho-chi-minh',
      name: 'Hồ Chí Minh',
    }, {
      _id: 'long-an',
      name: 'Long An',
    }, {
      _id: 'tien-giang',
      name: 'Tiền Giang',
    }, {
      _id: 'ben-tre',
      name: 'Bến Tre',
    }, {
      _id: 'tra-vinh',
      name: 'Trà Vinh',
    }, {
      _id: 'vinh-long',
      name: 'Vĩnh Long',
    }, {
      _id: 'dong-thap',
      name: 'Đồng Tháp',
    }, {
      _id: 'an-giang',
      name: 'An Giang',
    }, {
      _id: 'kien-giang',
      name: 'Kiên Giang',
    }, {
      _id: 'can-tho',
      name: 'Cần Thơ',
    }, {
      _id: 'hau-giang',
      name: 'Hậu Giang',
    }, {
      _id: 'soc-trang',
      name: 'Sóc Trăng',
    }, {
      _id: 'bac-lieu',
      name: 'Bạc Liêu',
    }, {
      _id: 'ca-mau',
      name: 'Cà Mau',
    }, {
      _id: 'tuyen-quang',
      name: 'Tuyên Quang',
    }, {
      _id: 'ha-noi',
      name: 'Hà Nội',
    }, {
      _id: 'ha-giang',
      name: 'Hà Giang',
    }, {
      _id: 'cao-bang',
      name: 'Cao Bằng',
    }, {
      _id: 'bac-kan',
      name: 'Bắc Kạn',
    }],
  },

  // Gender
  gender: {
    default: 'all',
    title: 'Giới tính',
    list: [{
      _id: 'all',
      name: 'Tất cả',
    }, {
      _id: 'male',
      name: 'Nam',
    }, {
      _id: 'fe-male',
      name: 'Nữ',
    }],
  },

  // position
  positions: {
    list: [
      {
        _id: 'employees',
        name: 'Nhân viên',
      },
      {
        _id: 'collaborators',
        name: 'Cộng tác viên',
      },
      {
        _id: 'leader',
        name: 'Trưởng nhóm',
      },
      {
        _id: 'deputy-director',
        name: 'Trưởng phó phòng',
      },
      {
        _id: 'senior-management',
        name: 'Quản lý cao cấp',
      },
    ],
  },

  // experience
  experience: {
    list: [
      {
        _id: 'no-has',
        name: 'Chưa có kinh nghiệm',
      },
      {
        _id: 'less-1',
        name: 'Dưới 1 năm kinh nghiệm',
      },
      {
        _id: 'one',
        name: '1 năm kinh nghiệm',
      },
      {
        _id: 'two',
        name: '2 năm kinh nghiệm',
      },
      {
        _id: 'three',
        name: '3 năm kinh nghiệm',
      },
      {
        _id: 'four',
        name: '4 năm kinh nghiệm',
      },
      {
        _id: 'five',
        name: '5 năm kinh nghiệm',
      },
      {
        _id: 'over-five',
        name: ' Trên 5 năm kinh nghiệm',
      },
    ],
  },

  // work mode
  workModes: {
    list: [
      {
        _id: 'official-staff',
        name: 'Nhân viên chính thức',
      },
      {
        _id: 'part-time',
        name: 'Nhân viên thời vụ',
      },
      {
        _id: 'extra-work',
        name: 'Làm thêm ngoài giờ',
      },
      {
        _id: 'intership',
        name: 'Thực tập và dự án',
      },
    ],
  },

  aducationLevel: {
    list: [
      {
        title: 'Cao học',
        value: 'after-university',
        name: 'after-university',
      }, {
        title: 'Đại học',
        value: 'university',
        name: 'university',
      }, {
        title: 'Cao đẳng',
        value: 'colleges',
        name: 'colleges',
      },
      {
        title: 'Trung cấp',
        value: 'intermediate',
        name: 'intermediate',
      },
      {
        title: 'Trung học',
        value: 'high-school',
        name: 'high-school',
      },
      {
        title: 'Chứng chỉ',
        value: 'certificate',
        name: 'certificate',
      },
      {
        title: 'Lao động phổ thông',
        value: 'unskilled-labor',
        name: 'unskilled-labor',
      },
    ],

    listFilter: [
      {
        name: 'Cao học',
        _id: 'after-university',
      }, {
        name: 'Đại học',
        _id: 'university',
      }, {
        name: 'Cao đẳng',
        _id: 'colleges',
      },
      {
        name: 'Trung cấp',
        _id: 'intermediate',
      },
      {
        name: 'Trung học',
        _id: 'high-school',
      },
      {
        name: 'Chứng chỉ',
        _id: 'certificate',
      },
      {
        name: 'Lao động phổ thông',
        _id: 'unskilled-labor',
      },
    ],
  },
  graduationType: {
    list: [
      {
        _id: 'great',
        name: 'Giỏi',
      },
      {
        _id: 'rather',
        name: 'Khá',
      },
      {
        _id: 'medium',
        name: 'Trung bình',
      },
    ],
  },
  mainSkills: {
    list: [
      {
        _id: 'leader',
        name: 'Lãnh đạo',
      }, {
        _id: 'working-group',
        name: 'Làm việc nhóm',
      }, {
        _id: ' strategic-management',
        name: 'Quản lý chiến lược',
      }, {
        _id: 'make-decision',
        name: 'Ra quyết định',
      }, {
        _id: 'time-management',
        name: 'Quản lý thời gian',
      }, {
        _id: 'communication',
        name: 'Quản lý giao tiếp',
      }, {
        _id: 'learn-effectively',
        name: 'Học hiệu quả',
      }, {
        _id: 'problem-solving',
        name: 'Giải quyết vấn đề',
      }, {
        _id: 'project-management',
        name: 'Quản lý dự án',
      }, {
        _id: 'stress-management',
        name: 'Quản lý stress',
      }, {
        _id: 'creative-management',
        name: 'Quản lý sáng tạo',
      },
      {
        _id: 'job',
        name: 'Nghề nghiệp',
      },
    ],
  },

  computerLiteracy: {
    list: [
      {
        _id: 'good',
        name: 'Loại Tốt',
      },
      {
        _id: 'rather',
        name: 'Loại Khá',
      },
      {
        _id: 'medium',
        name: 'Loại Trung bình',
      },
      {
        _id: 'poor',
        name: 'Loại Kém',
      },
    ],
  },

  typeLanguage: [
    {
      _id: 'english',
      name: 'Tiếng Anh',
    },
    {
      _id: 'french',
      name: 'Tiếng Pháp',
    },
    {
      _id: 'japan',
      name: 'Tiếng Nhật',
    },
    {
      _id: 'chinese',
      name: 'Tiếng Trung',
    },
    {
      _id: 'korean',
      name: 'Tiếng Hàn',
    },
    {
      _id: 'spain',
      name: 'Tiếng Tây Ban Nha',
    },
    {
      _id: 'russian',
      name: 'Tiếng Nga',
    },
    {
      _id: 'german',
      name: 'Tiếng Đức',
    },
  ],

  googleMaps: {
    defaultCenter: {
      lat: 16.0540381,
      lng: 108.2214767,
    },
    defaultZoom: 12,
    apiKey: 'AIzaSyCZ4kxv5IQJBL9biJANR2zsJp-P0TrONSw',
    region: 'vn',
    language: 'vi',
    libraries: ['places'],
  },

  salary: {
    list: [
      {
        key: '3To6',
        _id: '3To6',
        name: 'Từ 3 - 6 triệu',
        value: {
          from: 3000000,
          to: 6000000,
        },
      },
      {
        key: '6To10',
        _id: '6To10',
        name: 'Từ 6 - 10 triệu',
        value: {
          from: 6000000,
          to: 10000000,
        },
      },
      {
        key: '10To12',
        _id: '10To12',
        name: 'Từ 10 - 12 triệu',
        value: {
          from: 10000000,
          to: 12000000,
        },
      },
      {
        key: '12To15',
        _id: '12To15',
        name: 'Từ 12 - 15 triệu',
        value: {
          from: 12000000,
          to: 15000000,
        },
      },
      {
        key: '15To20',
        _id: '15To20',
        name: 'Từ 15 - 20 triệu',
        value: {
          from: 15000000,
          to: 20000000,
        },
      },
      {
        key: 'greater20',
        _id: 'greater20',
        name: 'Trên 20 triệu',
        value: {
          from: 20000001,
          to: 1000000000,
        },
      },
    ],
  },

  status: {
    default: 'all',
    list: [
      {
        _id: 'all',
        name: 'Tất cả',
      },
      {
        _id: 'pending',
        name: 'Đang chờ phê duyệt',
      },
      {
        _id: 'approved',
        name: 'Đã duyệt',
      },
      {
        _id: 'rejected',
        name: 'Từ chối',
      },
    ],
  },

  statusApply: {
    list: [
      {
        _id: 'pending',
        name: 'Đang chờ phê duyệt',
      },
      {
        _id: 'approved',
        name: 'Đã duyệt',
      },
      {
        _id: 'rejected',
        name: 'Từ chối',
      },
    ],
  },

  // Name type
  nameType: {
    account: 'account',
    business: 'business',
    businessHeader: 'businessHeader',
    recucitermentCover: 'recucitermentCover',
  },

  frequency: {
    list: [
      {
        _id: 'every_day',
        name: 'Mỗi ngày',
      },
      {
        _id: 'three_day',
        name: '3 ngày/lần',
      },
      {
        _id: 'once_a_week',
        name: 'Tuần/lần',
      },
    ],
  },

  cv: {
    status: {
      default: 'all',
      list: [
        {
          _id: 'all',
          name: 'Tất cả',
        },
        {
          _id: 'pending',
          name: 'Đang chờ phê duyệt',
        },
        {
          _id: 'approved',
          name: 'Đã duyệt',
        },
        {
          _id: 'rejected',
          name: 'Từ chối',
        },
      ],
    },
  },
}

