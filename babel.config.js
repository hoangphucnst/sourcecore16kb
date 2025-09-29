module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin', // Phải ở cuối danh sách plugins
  ],
};
