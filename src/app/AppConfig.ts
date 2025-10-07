import VersionInfo from 'react-native-version-info';

export interface IAppConfig {
  host: string | undefined;
  version: string | undefined;
  appName: string | undefined;
  verMigratePersist: number;
}

const AppConfig: IAppConfig = {
  // Live
  // host: 'https://api.qtds.vn/',
  // Test
  host: 'https://qtd.nst.com.vn:8090/',
  // Live
  hostLive: 'https://api.qtds.vn/',
  version: `${VersionInfo.appVersion}`,
  appName: 'Credit Fund',
  verMigratePersist: `${Number(VersionInfo.appVersion.replace(/\./g, ''))}`,
  schemeAppLink: 'qtdapp://',
  ios: 'itms-apps://itunes.apple.com/app/idYOUR_APP_ID',
  android: 'market://details?id=YOUR_PACKAGE_NAME',
};

export default AppConfig;
