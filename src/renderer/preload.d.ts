import { ElectronHandler } from '../main/preload';
export interface Screenshot {
  captureScreenShot: () => void;
  screenShotCaptured: (e) =>void;
}
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    screenshot: Screenshot;
  }
}

export {};
