import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, args: any) => ipcRenderer.send(channel, args),
    invoke: (channel: string, args?: any) => ipcRenderer.invoke(channel, args),
    on: (channel: string, func: any) =>
      ipcRenderer.on(channel, (_event, ...args) => func(...args)),
    once: (channel: string, func: any) =>
      ipcRenderer.once(channel, (_event, ...args) => func(...args)),
  },
})
