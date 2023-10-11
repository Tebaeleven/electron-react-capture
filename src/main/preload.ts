// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('screenshot', {
  // captureScreenShot 関数を実行する前に古いリスナーを削除
  captureScreenShot: () => {
    ipcRenderer.removeAllListeners('screenshot-captured');
    ipcRenderer.send('capture-screenshot');
  },
  screenShotCaptured: (callback) => {
    ipcRenderer.on('screenshot-captured', (event, screenshotURL) =>
      callback(event, screenshotURL),
    );
  },
});

export type ElectronHandler = typeof electronHandler;
