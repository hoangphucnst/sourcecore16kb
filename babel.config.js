module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~': './src',
          '~/assets': './src/assets',
          '~/screens': './src/screens',
          '~/styles': './src/styles',
          '~/routes': './src/routes',
          '~/services': './src/services',
          '~/hoc': './src/hoc',
          '~/hooks': './src/hooks',
          '~/redux': './src/redux',
          '~/constants': './src/constants',
          '~/app': './src/app',
          '~/components': './src/components',
          '~/utils': './src/utils',
          '~/helper': './src/helper',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
