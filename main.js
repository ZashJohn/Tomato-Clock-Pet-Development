// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,// 隐藏自带的菜单栏
    webPreferences: {
      nodeIntegration: true,// 把Node.js环境暴露给渲染进程
      contextIsolation: false // 禁用渲染进程的上下文隔离
    }
  })

  // 加载主窗口指定页面
  mainWindow.loadFile('index.html')
  // 当HTML文件加载完成后再显示主窗口
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 打开开发者工具
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
