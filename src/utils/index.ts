import AsyncStorage from '@react-native-async-storage/async-storage'
import {NavigationActions, StackActions} from '@react-navigation/compat'
import {
  CommonActions,
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native'
import React from 'react'
import {MessageOptions, showMessage} from 'react-native-flash-message'
import {TypeRefLoading} from '~/components/LoadingSpinner'
import {TypeOptionsMessageBox, TypeRefMessageBox} from '~/components/MessegeBox'
import {TypeRefControlDevices} from '~/screens/Popup/ControlDevices'
import {TypeRefChoiseDate, TypeChoiseDate} from '~/components/Popup/ChoiseDate'
import {SlideScreenRef} from '~/screens/Home/SlideScreen'
import {LayoutAnimation} from 'react-native'
import moment from 'moment'
import {
  FILE_EXTENSIONS,
  STATUS_CONTRACT_COLORS,
  TYPE_PROCESSS_TASK_QTD,
} from '~/constants'
import {Icons} from '~/assets'
import {useAppStyles} from '~/hooks'

const _navigator = React.createRef<NavigationContainerRef<ParamListBase>>()
const _refLoading = React.createRef<TypeRefLoading>()
const _refMessage = React.createRef<TypeRefMessageBox>()
const _refControlDevive = React.createRef<TypeRefControlDevices>()
const _refChoiseDate = React.createRef<TypeRefChoiseDate>()
const _refSlideScreen = React.createRef<SlideScreenRef>()

function navigate(routeName = '', params = {}) {
  try {
    _navigator.current?.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    )
  } catch (error) {
    log('Navigation', `Navigate to -> ${routeName} | Error -> ${error}`)
  }
}

function ngetParam(props: any, keys: string, defaultValue: any) {
  if (props.route.params) {
    if (
      props.route.params.hasOwnProperty(keys) &&
      props.route?.params[keys] !== undefined &&
      props.route?.params[keys] != null
    ) {
      return props.route?.params[keys]
    } else {
      return defaultValue
    }
  } else {
    return defaultValue
  }
}

/*
ngetParams
  |-> Example (1 param):
    const params = ngetParams(props, ['param_1'], {
      param_1: 'defaultString',
    });

  |-> Example (n params):
    const {param_1, param_2, param_3} = ngetParams(
      props,
      ['param_1', 'param_2', 'param_3'],
      {
        param_1: 'defaultString',
        param_2: 42,
        param_3: {key: 'defaultObject'},
      },
    )

    const keys = ['userId', 'theme', 'language']; // The keys you want to retrieve from the params
    const defaultValues = {
      userId: 0,        // Default value for userId
      theme: 'light',   // Default value for theme
      language: 'en',   // Default value for language
    };

    // Call the function
    const result = ngetParams(props, keys, defaultValues);
*/

function ngetParams<T extends Record<string, any>>(
  props: {route?: {params?: Partial<T>}},
  keys: (keyof T)[],
  defaultValues: T,
): T {
  const params = props.route?.params || {}

  return keys.reduce((result, key) => {
    const value = params[key]
    const defaultValue = defaultValues[key]

    if (value == null) {
      result[key] = defaultValue
    } else if (Array.isArray(defaultValue) && !Array.isArray(value)) {
      // Fix trường hợp array bị chuyển thành object {0:..., 1:...}
      result[key] = Object.values(value)
    } else if (
      typeof value === 'object' &&
      typeof defaultValue === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      result[key] = {
        ...defaultValue,
        ...value,
      }
    } else {
      result[key] = value
    }

    return result
  }, {} as T)
}

function replace(routeName = '', params = {}) {
  try {
    _navigator.current?.dispatch(
      StackActions.replace({
        routeName,
        params,
      }),
    )
  } catch (error) {
    log('Navigation', `Replace with -> ${routeName} | Error ${error}`)
  }
}

function resetToScreen(routeName = '', params = {}) {
  try {
    _navigator.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: routeName,
            params,
          },
        ],
      }),
    )
  } catch (error) {
    log('Navigation', `Reset to -> ${routeName} | Error ${error}`)
  }
}

function push(routeName = '', params = {}) {
  try {
    _navigator.current?.dispatch(
      StackActions.push({
        routeName,
        params,
      }),
    )
  } catch (error) {
    log('Navigation', `Push to -> ${routeName} | Error ${error}`)
  }
}

function showMessageFlash(option: MessageOptions) {
  showMessage({
    ...option,
    message: option?.message || 'Thông báo',
    description: option?.description || '',
    icon: option?.icon || 'info',
    duration: option?.duration || 3000,
    type: option?.type || 'info', // "none" | "default" | "info" | "success" | "danger" | "warning"
  })
}

function goBackNavigation() {
  try {
    _navigator.current?.dispatch(CommonActions.goBack())
  } catch (error) {
    __DEV__ && console.log(`[Navigation] -> go back | Error: ${error}`)
  }
}

function showLoadingFullApp({
  show = false,
  text = '',
}: {
  show: boolean
  text?: string | ''
}) {
  try {
    if (_refLoading.current?.show && show) {
      _refLoading.current?.show(text)
    }
    if (_refLoading.current?.hide && !show) {
      _refLoading.current.hide()
    }
  } catch (error) {
    log('SHOW LOADING FULL APP', `Error -> ${error}`)
  }
}

function messageBox(option?: TypeOptionsMessageBox) {
  try {
    option = {
      showCancel: true,
      ...option,
    }
    if (option != null && _refMessage.current?.show) {
      _refMessage.current?.show(option)
    }
    if (_refMessage.current?.hide && option == null) {
      _refMessage.current.hide()
    }
  } catch (error) {
    log('SHOW MESSAGE BOX FULL APP', `Error -> ${error}`)
  }
}

function onControlDevice(callback = () => {}) {
  try {
    _refControlDevive.current?.expand(callback)
  } catch (error) {
    log('CONTROL DEVICE APP', `Error -> ${error}`)
  }
}

function onChoiseDate(option: TypeChoiseDate) {
  try {
    _refChoiseDate.current?.expand(option)
  } catch (error) {
    log('CHOISE DATE', `Error -> ${error}`)
  }
}

async function saveStorage(keys: string, value: any) {
  if (typeof value !== 'string') value = JSON.stringify(value)
  await AsyncStorage.setItem(keys, value)
}

async function getStorage(keys: string, defaultValue = null) {
  const temp = await AsyncStorage.getItem(keys)
  if (temp == null) return defaultValue
  try {
    const tempValue = JSON.parse(temp)
    return tempValue
  } catch (error) {
    return temp
  }
}

function generateUUIDv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const random = Math.random() * 16
    const value = char === 'x' ? Math.floor(random) : Math.floor(random % 4) + 8
    return value.toString(16)
  })
}

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

function removeAccents(inputStr = '') {
  return inputStr
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase()
}

function openSlideScreen() {
  _refSlideScreen.current?.open()
}

function closeSlideScreen() {
  _refSlideScreen.current?.close()
}

function initHeightHeaderSlideScreen(height: number) {
  _refSlideScreen.current?.initHeightTransparent(height)
}

function getStatusSlideScreen() {
  return _refSlideScreen.current?.getStatus()
}

const log = (title: string = '', value: any = '') => {
  if (!__DEV__) return

  const divider = '─'.repeat(100)
  const displayTitle = `[LOG] ${title || 'Anonymous'}`
  const valueType = Object.prototype.toString.call(value).slice(8, -1) // Eg: 'Array', 'Object', 'String'

  console.log(`${divider}`)
  console.log(`🔍 ${displayTitle}`)
  console.log(`📚 Type: ${valueType}`)

  if (valueType === 'Object' || valueType === 'Array') {
    try {
      console.log('📦 Value:', JSON.stringify(value, null, 2))
    } catch (e) {
      console.log('📦 Value: [Unserializable Object]', value)
    }
  } else {
    console.log('📦 Value:', value)
  }

  console.log(`${divider}\n`)
}

const onChangeLayoutAnimation = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}

const isDefined = (value: any): boolean => {
  if (value === undefined || value === null) return false

  if (typeof value === 'string' && value.trim() === '') return false

  if (Array.isArray(value)) return value.length > 0

  if (typeof value === 'object') return Object.keys(value).length > 0

  return true
}

const parseJsonSafe = <T = any>(input: string, fallback: T = {} as T): T => {
  try {
    return JSON.parse(input)
  } catch {
    return fallback
  }
}

const formatDate = (
  date: string | Date | Moment | null | undefined,
  format = 'DD/MM/YYYY',
): string => {
  if (!date) return ''

  const momentDate = moment.isMoment(date) ? date : moment(date)
  return momentDate.format(format)
}

const getFileIconByExtension = (text: string) => {
  const lowerText = text.toLowerCase()

  const match = (exts: string[]) =>
    exts.some(ext => lowerText.includes(`.${ext}`))

  if (match(FILE_EXTENSIONS.PDF)) return Icons.icPdf
  if (match(FILE_EXTENSIONS.WORD)) return Icons.icWord
  if (match(FILE_EXTENSIONS.POWER_POINT)) return Icons.icPowerPoint
  if (match(FILE_EXTENSIONS.EXCEL)) return Icons.icExcel
  if (match(FILE_EXTENSIONS.IMAGE)) return Icons.icGalary

  return Icons.icOtherFile
}

const isValidDateRange = (
  fromDate?: string | Date | null,
  toDate?: string | Date | null,
): boolean => {
  if (!fromDate || !toDate) return true
  return new Date(fromDate).getTime() <= new Date(toDate).getTime()
}

type FormatMoneyMode = 'round' | 'decimal'

interface FormatMoneyOptions {
  mode?: FormatMoneyMode // 'round' mặc định nếu không truyền
  showCurrency?: boolean
}

const formatMoney = (
  value: string | number,
  options?: FormatMoneyOptions,
): string => {
  try {
    const mode = options?.mode ?? 'round'
    const showCurrency = options?.showCurrency ?? true

    let original = String(value).trim()
    const hasVND = original.toUpperCase().includes('VND')

    // Loại bỏ "VND" hoặc "vnd" nếu có
    if (hasVND) {
      original = original.replace(/vnd/i, '').trim()
    }

    // Nếu chuỗi đã định dạng dạng
    const vietnamMoneyRegex = /^\d{1,3}(\.\d{3})*(,\d{1,2})?$/
    if (typeof value === 'string' && vietnamMoneyRegex.test(original)) {
      // Parse lại thành số để định dạng lại theo mode
      const normalized = original.replace(/\./g, '').replace(',', '.')
      const parsed = parseFloat(normalized)
      if (isNaN(parsed)) return String(value)

      const fractionDigits = mode === 'decimal' ? 2 : 0
      const formatted = parsed.toLocaleString('vi-VN', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })

      return showCurrency ? `${formatted} VND` : formatted
    }

    if (typeof value === 'string') {
      const parsed = parseFloat(original.replace(/[^0-9.-]/g, ''))
      if (isNaN(parsed)) return value
      value = parsed
    }

    if (typeof value !== 'number' || isNaN(value)) return String(value)

    const fractionDigits = mode === 'decimal' ? 2 : 0
    const formatted = value.toLocaleString('vi-VN', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })

    return showCurrency ? `${formatted} VND` : formatted
  } catch (error) {
    return String(value)
  }
}

// Function to convert amount
function convertAmount(amount: number | string): string {
  const numAmount =
    typeof amount === 'string' ? parseFloat(amount.replace(/\D/g, '')) : amount

  if (isNaN(numAmount)) {
    return String(amount) // Nếu không phải số, return nguyên
  }

  if (numAmount >= 1_000_000_000) {
    const billions = Math.floor(numAmount / 1_000_000_000)
    const millions = Math.floor((numAmount % 1_000_000_000) / 1_000_000)
    const thousands = Math.floor((numAmount % 1_000_000) / 1_000)

    const parts: string[] = []
    if (billions > 0) parts.push(`${billions} tỷ`)
    if (millions > 0) parts.push(`${millions} triệu`)
    if (thousands > 0) parts.push(`${thousands} ngàn`)

    return parts.join(' ')
  }

  return numAmount.toLocaleString('vi-VN')
}

const formatPermission = (permissions: string) => {
  try {
    return permissions?.split(',')?.map(Number) || []
  } catch (error) {
    log('formatPermission -> error', error)
    return []
  }
}

const formatValue = (value: string | null | undefined) => {
  return value?.trim() ? value : '---'
}

function GetStatusColor(status: string): string {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return STATUS_CONTRACT_COLORS[status] || colors.primary
}

const createLightColor = (hexColor: string, lightenFactor = 0.7) => {
  let color = hexColor.replace('#', '')

  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('')
  }

  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  const newR = Math.round(r + (255 - r) * lightenFactor)
  const newG = Math.round(g + (255 - g) * lightenFactor)
  const newB = Math.round(b + (255 - b) * lightenFactor)

  const toHex = (value: number) => value.toString(16).padStart(2, '0')

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`.toUpperCase()
}

const safeValue = (value: any, emptyText = '---') => {
  if (typeof value === 'string' && value.trim() !== '') return value
  if (typeof value === 'number') return `${value}`
  return emptyText
}

const formatSafeValue = (
  value: any,
  options?: {
    isPercent?: boolean
    isCurrency?: boolean
    emptyText?: string
  },
): string => {
  const {
    isPercent = false,
    isCurrency = false,
    emptyText = '---',
  } = options || {}

  if (value === undefined || value === null || value === '') return emptyText

  const numericValue = Number(value)
  if (isNaN(numericValue)) return value.toString()

  let formatted = numericValue.toLocaleString('vi-VN')

  if (isCurrency) {
    formatted += ' VNĐ'
  } else if (isPercent) {
    formatted += '%'
  }

  return formatted
}

const getGreetingByTime = (): string => {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 11) {
    return 'Chào buổi sáng'
  } else if (hour >= 11 && hour < 13) {
    return 'Chào buổi trưa'
  } else if (hour >= 13 && hour < 18) {
    return 'Chào buổi chiều'
  } else {
    return 'Chào buổi tối'
  }
}

type DateFormat =
  | 'YYYY-MM-DD'
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'YYYY/MM/DD'
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY'

export const convertDateFormat = (
  dateStr: string,
  fromType: DateFormat,
  toType: DateFormat,
): string => {
  if (!dateStr) return ''

  const fromDelimiter = fromType.includes('/') ? '/' : '-'
  const toDelimiter = toType.includes('/') ? '/' : '-'

  const fromParts = fromType.split(fromDelimiter)
  const toParts = toType.split(toDelimiter)
  const dateValues = dateStr.split(fromDelimiter)

  const dateMap: Record<string, string> = {}
  fromParts.forEach((part, index) => {
    dateMap[part] = dateValues[index]
  })

  const result = toParts.map(part => dateMap[part] || '').join(toDelimiter)

  return result
}

function isHTML(str: any) {
  const htmlRegex = /<[a-z][\s\S]*>/i
  return htmlRegex.test(str)
}

export const reverseConstantValue = (
  enumObj: Record<number, string>,
  value: string,
): number | undefined => {
  for (const key in enumObj) {
    if (enumObj[key as unknown as number] === value) {
      return Number(key)
    }
  }
  return undefined
}

const getMinMax = (numbers: number[]): {min: number; max: number} => {
  if (numbers.length === 0) {
    throw new Error('Input array must not be empty.')
  }

  const min = Math.min(...numbers)
  const max = Math.max(...numbers)

  return {min, max}
}

const generateSteps = (min: number, max: number, length: number): number[] => {
  if (length <= 1) return [min]

  const range = max - min
  const rawStep = range / (length - 1)
  const step = Math.ceil(rawStep / 10000) * 10000

  return Array.from({length}, (_, i) => min + step * i)
}

const convertObjectToArray = (obj: Record<string, number>): number[] => {
  if (obj === null || obj === undefined) return []
  return Object.keys(obj)
    .sort((a, b) => Number(a) - Number(b))
    .map(key => obj[key])
}

const getTaskProcessText = (status: number): string => {
  return TYPE_PROCESSS_TASK_QTD[status] || 'Không xử lý'
}

const getKeyFromLabel = (
  label: string,
  statusMap: Record<string, string>,
): string | undefined => {
  for (const key in statusMap) {
    if (statusMap[key] === label) {
      return key
    }
  }
  return undefined
}

const parsePseudoJson = <T = any>(data: string): T | null => {
  try {
    const fixed = data.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
    return JSON.parse(fixed)
  } catch (e) {
    utils.log('parsePseudoJson -> Không thể parse:', e)
    return null
  }
}

const parseNumber = (numberString: string): number => {
  try {
    if (!numberString) return 0

    // Loại bỏ các ký tự không phải số, dấu phẩy, hoặc dấu chấm
    const cleaned = numberString.replace(/[^\d.,-]/g, '')

    // Nếu có cả , và ., xác định định dạng (dựa theo số lượng hoặc vị trí)
    const hasComma = cleaned.includes(',')
    const hasDot = cleaned.includes('.')

    let normalized = cleaned

    if (hasComma && hasDot) {
      // Giả định: . là ngăn cách hàng nghìn, , là dấu thập phân (định dạng VN, EU)
      normalized = cleaned.replace(/\./g, '').replace(',', '.')
    } else if (hasComma && !hasDot) {
      // Chỉ có dấu phẩy -> coi là thập phân
      normalized = cleaned.replace(',', '.')
    } else {
      // Trường hợp có dấu chấm -> giữ nguyên (coi là dấu thập phân)
    }

    const parsed = parseFloat(normalized)
    return isNaN(parsed) ? 0 : parsed
  } catch (error) {
    log('parseNumber -> Không thể parse:', error)
    return 0
  }
}

export default {
  // ⚡ values
  _navigator,
  _refLoading,
  _refMessage,
  _refControlDevive,
  _refChoiseDate,
  _refSlideScreen,

  // ⚡ functions
  log,
  showMessageFlash,
  navigate,
  replace,
  push,
  showLoadingFullApp,
  goBackNavigation,
  messageBox,
  onControlDevice,
  onChoiseDate,
  saveStorage,
  getStorage,
  ngetParam,
  generateUUIDv4,
  debounce,
  removeAccents,
  openSlideScreen,
  closeSlideScreen,
  initHeightHeaderSlideScreen,
  getStatusSlideScreen,
  ngetParams,
  onChangeLayoutAnimation,
  isDefined,
  parseJsonSafe,
  formatDate,
  getFileIconByExtension,
  isValidDateRange,
  formatMoney,
  resetToScreen,
  convertAmount,
  formatPermission,
  formatValue,
  GetStatusColor,
  createLightColor,
  safeValue,
  getGreetingByTime,
  convertDateFormat,
  isHTML,
  reverseConstantValue,
  getMinMax,
  generateSteps,
  convertObjectToArray,
  getTaskProcessText,
  formatSafeValue,
  getKeyFromLabel,
  parsePseudoJson,
  parseNumber,
}
