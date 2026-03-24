import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'

const isDev = !app.isPackaged
import { setupIpcHandlers } from './ipcHandlers'

let mainWindow: BrowserWindow | null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../../dist/index.html')}`

  mainWindow.loadURL(startUrl).catch(err => {
    console.error('Error al cargar la URL:', err)
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  setupIpcHandlers()
  createWindow()

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Menú
const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Archivo',
    submenu: [
      {
        label: 'Salir',
        click: () => {
          app.quit()
        },
      },
    ],
  },
  {
    label: 'Ver',
    submenu: [
      {
        label: 'Recargar',
        role: 'reload',
      },
      {
        label: 'Forzar Recarga',
        role: 'forceReload',
      },
      {
        label: 'Alternar Herramientas de Desarrollo',
        role: 'toggleDevTools',
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

export default app
