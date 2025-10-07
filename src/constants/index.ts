import {ImageSourcePropType} from 'react-native'
import {ConnectivityArgs} from 'react-native-offline/dist/src/types'
import {Icons} from '~/assets'

export {default as KEY_STORAGE} from './AppKeyStore'

export const MODE_THEME = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
}

export type ExtentionsItem = {
  name: string
  image?: ImageSourcePropType | null
  screen?: string | ''
}

const DEFAULT_TIMEOUT = 10000
const DEFAULT_PING_SERVER_URL = 'https://www.google.com/'
const DEFAULT_HTTP_METHOD = 'HEAD'
const DEFAULT_CUSTOM_HEADERS = {}

export const DEFAULT_ARGS_NETWORK_PROVIDER: ConnectivityArgs = {
  pingTimeout: DEFAULT_TIMEOUT,
  pingServerUrl: DEFAULT_PING_SERVER_URL,
  shouldPing: true,
  pingInterval: 15000,
  pingOnlyIfOffline: true,
  pingInBackground: false,
  httpMethod: DEFAULT_HTTP_METHOD,
  customHeaders: DEFAULT_CUSTOM_HEADERS,
}

export const LIST_EXTENTIONS: Array<ExtentionsItem> = [
  {
    name: 'Đặt lịch thiết bị',
    image: Icons.icSchedule,
    screen: 'ScheduleDevices',
  },
  // {
  //   name: 'Đặt lịch thiết bị',
  //   image: Icons.icSchedule,
  //   screen: 'ScheduleDevices',
  // },
]

export const labelIndexSolar = {
  arrayLabelV: ['SL', 'B1', 'B2', 'B3', 'AV', 'OV'],
  arrayLabelmA: ['AC', 'OC'],
  arrayLabelMore: ['AP', 'AR', 'LU', 'TP', 'HM'],
  arrayUnit: ['%', 'mΩ', ' lux', '°C', '%'],
}

export const LANGUAGE = {
  VietNam: 'vi',
  English: 'en',
  China: 'cn',
}

export const CUSTOMER_STATUS = {
  ALL: 'Tất cả',
  LOCK: 'Khóa',
  UNLOCK: 'Hoạt động',
}

export const TYPE_ATTACH_FILE = {
  CCCD: 1,
  OTHER: 2,
  SIGNATURE_DIGITAL: 3,
  SIGNATURE_LIVE: 4,
}

export const TYPE_ATTACH_FILE_CREDIT_CONTRACT = {
  SIGNATURE_DIGITAL: 1,
  SIGNATURE_LIVE: 2,
  OTHER: 3,
}

export const FILE_EXTENSIONS = {
  WORD: ['doc', 'docx'],
  POWER_POINT: ['ppt', 'pptx'],
  EXCEL: ['xls', 'xlsx'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
  PDF: ['pdf'],
}

export const STATUS_CONTRACT_COLORS: Record<string, string> = {
  DACHOVAY: '#4BD37B',
  HOANTHANH: '#EB5B57',
  DANGGIAIQUYET: '#E7A24E',
  DAGIAINGAN: '#9B6EF3',
  RETURN: '#67D6C1',
}

export const STATUS_CONTRACT_TEXT: Record<string, string> = {
  DACHOVAY: 'Đã cho vay',
  HOANTHANH: 'Hoàn thành',
  DANGGIAIQUYET: 'Đang giải quyết',
  DAGIAINGAN: 'Đã giải ngân',
  RETURN: 'Trả lại người thiết lập',
}

export const STATUS_TASK_COLORS: Record<string, string> = {
  'Gửi đánh giá': '#3498DB',
  'Đã đánh giá': '#2ECC71',
  'Đang xử lý': '#9B59B6',
  'Gửi đăng ký': '#1ABC9C',
  'Xử lý lại': '#F39C12',
  'Từ chối': '#E74C3C',
  'Chưa xử lý': '#95A5A6',
}

export const USER_PERMISSION = {
  SCREEN: {
    CREDIT: 17, // Tab tín dụng
    MORTGAGE: 16, // Tab thế chấp
    CUSTOMER: 13, // Tab khách hàng
    ALWAYS_SHOW: -1,
  },
  ACTION: {
    CREDIT: {
      VIEW: 0,
    },
    MORTGAGE: {
      VIEW: 0,
    },
    CUSTOMER: {
      VIEW: 0,
    },
    DASHBOARD: {
      INFO_FINACIAL: 24,
      DEBT_AND_CAPITAL: 24,
      DEBT_AND_CUSTOMER: 25,
      PERSONAL_AND_COMMON_PROFILE: 26,
      SOLVED_CREDIT_CONTRACT: 26,
      PERSONAL_AND_ASSIGNED_TASK: 27,
    },
  },
}

export const LIST_IMAGE_HEADER_HOME: {id: string; image: string}[] = [
  {
    id: 1,
    image: Icons.imgCityWater,
  },
  {
    id: 2,
    image: Icons.imgHaLong,
  },
  {
    id: 3,
    image: Icons.imgDaNang,
  },
  {
    id: 4,
    image: Icons.imgDoiChe,
  },
]

export const FAB_TASKS = {
  Evaluation: 'Đánh giá',
  UpdateTask: 'Cập nhật tiến độ',
  ApproveTask: 'Duyệt công việc',
  RejectTask: 'Từ chối công việc',
  SubmitEvaluation: 'Gửi đánh giá',
  DeleteTask: 'Xóa công việc',
  TrackingTask: 'Theo dõi công việc',
  SubmitComment: 'Ý kiến',
}

export const FAB_CREDIT = {
  Approve: 'Duyệt hợp đồng',
  Reject: 'Từ chối hợp đồng',
  Tracking: 'Theo dõi hợp đồng',
  CompleteLoan: 'Hoàn thành khoản vay',
  ReturnToInitiator: 'Thu hồi hợp đồng',
  UpdateLoanGroup: 'Cập nhật nhóm nợ',
  Recall: 'Thu hồi',
  Disbursed: 'Đã giải ngân',
}

export const STATUS_TASK_QTD = {
  1: 'Gửi đánh giá',
  2: 'Đã đánh giá',
  3: 'Đang xử lý',
  4: 'Gửi đăng ký',
  5: 'Xử lý lại',
  6: 'Từ chối',
}

export const REVIEW_TASK_TYPE_BUTTON = {
  SaveEvaluteTask: 2,
  ReProcessTask: 1,
}

export const TYPE_TASK_QTD = {
  1: 'Công việc chung',
  2: 'Công việc riêng',
}

export const TYPE_PROCESSS_TASK_QTD = {
  1: 'Xử lý chính',
  2: 'Phối hợp xử lý',
  3: 'Không xử lý',
  4: 'Chưa phê duyệt',
  5: 'Chưa đánh giá',
  6: 'Từ chối',
  7: 'Bị từ chối',
  8: 'Đã đánh giá',
  9: 'Đã phê duyệt',
  10: 'Gửi đăng ký',
  11: 'Hoàn thành',
}

export const STATUS_PROCESS_TASK_QTD = {
  1: 'Đang thực hiện',
  2: 'Hoàn thành',
  3: 'Tạm dừng',
}

export const PRIOTY_TASK_QTD = {
  1: 'Cao',
  2: 'Trung bình',
  3: 'Thấp',
}

export const MODE_DOWNLOAD_FILE = {
  VIEW: 'view',
}

export const OBJECT_TYPE = {
  MortgageContract: 2,
  Customer: 5,
} as const

export const TYPE_FILE_DETAIL_TASK_QTD = {
  7: 'File khác',
  8: 'Báo cáo',
}

export const ALLOWED_ACTION_TASK_QTD = {
  1: FAB_TASKS.TrackingTask,
  2: FAB_TASKS.Evaluation,
  3: FAB_TASKS.UpdateTask,
  4: FAB_TASKS.SubmitEvaluation,
  5: FAB_TASKS.SubmitComment,
  6: FAB_TASKS.ApproveTask,
  7: FAB_TASKS.RejectTask,
  8: FAB_TASKS.DeleteTask,
}

export const LOCAL_PAGE = {
  CreditContract: 'CreditContract',
  Task: 'Task',
} as const

export const MODE_COMMENT_CREDIT = {
  DENY: 'DENY',
  RETURNTOSENDER: 'RETURNTOSENDER',
}

export const STATUS_WORKING_HANDLER = {
  '-1': 'Từ chối',
  '0': 'Đang xử lý',
  '1': 'Đã duyệt',
}

export const EVALUATION_TASK = {
  PASSED: 'Đạt',
  FAILED: 'Không đạt',
} as const

export const TYPE_SIGN = {
  NORMAL: 'NORMAL',
  SIM_CA: 'SIM_CA',
  CA_CLOUD: 'CA_CLOUD',
}

export const MODE_FAB_ACTION_CREDIT = {
  APPROVAL: 'APPROVAL',
  TRACK: 'TRACK',
  UPDATEDEBTGROUP: 'UPDATEDEBTGROUP',
  RETURNTOSENDER: 'RETURNTOSENDER',
  DISBURSED: 'DISBURSED',
  COMPLETE: 'COMPLETE ',
}

export const LOAN_GROUP = {
  'Group-1': 'Nhóm 1',
  'Group-2': 'Nhóm 2',
  'Group-3': 'Nhóm 3',
  'Group-4': 'Nhóm 4',
  'Group-5': 'Nhóm 5',
}

export const TYPE_RETURN = {
  important: 'Nghiêm trọng',
  bug: 'Lỗi',
}

export const FINANCIAL_OVERVIEW_LABELS = {
  accumulatedAssets: 1, // 'Tài sản tích lũy',
  currentLoans: 2, // 'Khoản vay hiện tại',
  incomeSources: 3, // 'Nguồn thu nhập',
  expenses: 4, // 'Các khoản chi phí',
}

export const SQUARE_TEXT = {
  ISSQUARE: 'Có',
  ISNOTSQUARE: 'Không',
}

export const METHOD_CACULATING_ASSET_TEXT = {
  BOTH: 'Tính giá nhà nước và tính giá thị trường',
  SURVEY: 'Khảo sát thị trường',
  STATE: 'Tính giá nhà nước',
  MARKET: 'Tinh giá thị trường',
}

export const ALLEY_TYPE_TEXT = {
  CONCRETEALLEY: 'Hẻm bê tông',
  PAVEDALLEY: 'Hẻm trải nhựa',
  DIRTALLEY: 'Hẻm đất',
  LEVELALLEY: 'Cấp bậc',
  NOALLEY: 'Không có',
}

export const LIMIT_TEXT = {
  Yes: 'Có',
  No: 'Không',
}

export const AREA_LAND_TYPE_TEXT = {
  URBAN: 'Đô thị',
  RURAL: 'Nông thôn',
}

export const LAND_TYPE_TEXT = {
  RESIDENTIALLAND: 'Đất ở ',
  AGRICULTURALLAND: 'Đất nông nghiệp',
  NONAGRICULTURALLAND: 'Đất phi nông nghiệp',
}

export const DEBT_REPAY_METHOD = {
  cash: 'Trả tiền mặt ',
  transfer: 'Chuyển khoản',
}

export const TYPE_GROUP_NAME_NOTIFICATION = {
  CUSTOMER: 'CUSTOMER',
  MORTGAGE: 'MORTGAGE',
  TASK: 'TASK',
  CREDIT: 'CREDIT',
}

export const TYPE_NOTIFICATION_KEY = {
  [TYPE_GROUP_NAME_NOTIFICATION.CUSTOMER]: {
    ADD_CUSTOMER: 'ADD_CUSTOMER',
  },
  [TYPE_GROUP_NAME_NOTIFICATION.MORTGAGE]: {
    ADD_MORTGAGECONTRACT: 'ADD_MORTGAGECONTRACT',
  },
  [TYPE_GROUP_NAME_NOTIFICATION.TASK]: {
    ASSIGN_TASK: 'ASSIGN_TASK',
    DENIED_TASK: 'DENIED_TASK',
    APPROVE_TASK: 'APPROVE_TASK',
    EXPIRE_TASK: 'EXPIRE_TASK',
    SUBMIT_EVALUATION: 'SUBMIT_EVALUATION',
    EVALUATED_TASK: 'EVALUATED_TASK',
    REPROCESS_TASK: 'REPROCESS_TASK',
    REGIS_TASK: 'REGIS_TASK',
    DELETE_TASK: 'DELETE_TASK',
    COMMENT_TASK: 'COMMENT_TASK',
  },
  [TYPE_GROUP_NAME_NOTIFICATION.CREDIT]: {
    CREATE_CREDITCONTRACT: 'CREATE_CREDITCONTRACT',
    EXPIRE_CREDITCONTRACT: 'EXPIRE_CREDITCONTRACT',
    OVERDUE_CREDITCONTRACT: 'OVERDUE_CREDITCONTRACT',
    APPROVE_CREDITCONTRACT: 'APPROVE_CREDITCONTRACT',
    REJECT_CREDITCONTRACT: 'REJECT_CREDITCONTRACT',
    UPDATE_CREDITCONTRACT: 'UPDATE_CREDITCONTRACT',
    COMMENT_CREDITCONTRACT: 'COMMENT_CREDITCONTRACT',
  },
} as const
