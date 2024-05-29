const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('node:path')

function createWindow() {
  // 创建主窗口
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,// 隐藏自带的菜单栏
    webPreferences: {
      // enableRemoteModule: true,// 把remote模块暴露给渲染进程
      nodeIntegration: true,// 把Node.js环境暴露给渲染进程
      contextIsolation: false, // 禁用渲染进程的上下文隔离
      //preload: path.join(__dirname, 'preload.js')
    }
  })
  // 加载主窗口指定页面
  mainWindow.loadFile('index.html')
  // 当HTML文件加载完成后再显示主窗口
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 打开开发者工具
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()


  // 进行数据库连接
  // const mysql = require('mysql');

  // // 创建数据库连接
  // const connection = mysql.createConnection({
  //   host: 'localhost',  // 数据库主机名
  //   user: 'root',       // 数据库用户名
  //   password: 'qwe123456',   // 数据库密码
  //   database: 'task_list' // 数据库名
  // });

  // // 连接到数据库
  // connection.connect((err) => {
  //   if (err) {
  //     console.error('无法连接到数据库: ' + err.stack);
  //     return;
  //   }
  //   console.log('成功连接到数据库,id为 ' + connection.threadId);
  // });

  // // 向数据库中添加数据
  // function addDataToDatabase(event, queryStr) {
  //   connection.query(queryStr, (err, results) => {
  //     if (err) {
  //       console.error('添加数据失败:', err);
  //       return;
  //     }
  //     console.log('添加数据成功');
  //   });
  // };



  // ipcMain.on('set-title', handleSetTitle)

  //  ipcMain.on('db-query', addDataToDatabase)

  // 将数据库连接对象暴露给渲染进程（通过IPC）
  //   ipcMain.handle('db-query', async (event, query) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(query, (err, results) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(results);
  //         }
  //       });
  //     });
  //   });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
