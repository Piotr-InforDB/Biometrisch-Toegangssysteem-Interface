import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Biometrisch Toegangssysteem Interface',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'http'
  }
};

export default config;
