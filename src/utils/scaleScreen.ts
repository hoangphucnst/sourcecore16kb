import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const BASE_WIDTH_TABLET = 744;
const BASE_HEIGHT_TABLET = 1133;

// Chiều rộng và chiều cao chuẩn (mặc định cho iphone 13 mini)
const BASE_WIDTH =
  Platform.isPad && Platform.OS === 'ios' ? BASE_WIDTH_TABLET : 375;
const BASE_HEIGHT =
  Platform.isPad && Platform.OS === 'ios' ? BASE_HEIGHT_TABLET : 812;

let SCREEN_WIDTH = width;
let SCREEN_HEIGHT = height;
let IS_PORTRAIT = height >= width; // Trạng thái ban đầu của orientation

// Lắng nghe thay đổi orientation (khi xoay màn hình)
Dimensions.addEventListener('change', ({window}) => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
  IS_PORTRAIT = window.height >= window.width; // Cập nhật orientation
});

// Luôn scale theo chiều ngang lấy chiều ngang làm gốc và chiều rông mặc định iphone 13 mini
const scale = (size: number) => {
  const baseSize = BASE_WIDTH;
  const screenSize = IS_PORTRAIT ? SCREEN_WIDTH : SCREEN_HEIGHT;
  return (screenSize / baseSize) * size;
};

// Hàm verticalScale tỷ lệ dựa trên chiều cao
const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Hàm horizontalScale (dùng khi cần chia tỷ lệ ngang đặc biệt)
const horizontalScale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const scaleFont = (size: number) => {
  const baseSize = BASE_WIDTH;
  const screenSize = IS_PORTRAIT ? SCREEN_WIDTH : SCREEN_HEIGHT;
  return (screenSize / baseSize) * size;
};

// Hàm scale theo phần trăm chiều cao
const p_verticalScale = (percent: number) => (SCREEN_HEIGHT * percent) / 100;

// Hàm scale theo phần trăm chiều rộng
const p_horizontalScale = (percent: number) => (SCREEN_WIDTH * percent) / 100;

export {
  scale,
  scaleFont,
  verticalScale,
  horizontalScale,
  p_verticalScale,
  p_horizontalScale,
};
