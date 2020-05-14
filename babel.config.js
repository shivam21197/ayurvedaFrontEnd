module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', 'js', '.ios.js', '.android.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@modules': './src/modules',
          '@navigation': './src/navigation',
          '@network': './src/network',
          '@screens': './src/screens',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@domain': './src/domain',
        },
      },
    ],
  ],
};
