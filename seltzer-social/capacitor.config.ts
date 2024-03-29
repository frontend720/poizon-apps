import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'seltzer-social',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
