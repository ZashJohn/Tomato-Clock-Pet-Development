const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'myapi',
  {
    preserve: (query) => ipcRenderer.send('db-query', query),
  }
)
// const { contextBridge } = require('electron');

// contextBridge.exposeInMainWorld('database', {
//   addData: (data) => {
//     return new Promise((resolve, reject) => {
//       window.connection.query('INSERT INTO your_table SET ?', data, (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   }
// });
