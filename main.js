const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
const fs = require('fs');
const ipc = ipcMain;

const appPath = () => {
  switch (process.platform) {
    case 'darwin': {
      return path.join(process.env.HOME, 'Library', 'Application Support');
    }
    case 'win32': {
      return process.env.APPDATA;
    }
    case 'linux': {
      return process.env.HOME;
    }
  }
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    frame: false,

    transparent: true,
    titleBarOverlay: true,
    icon: path.join(__dirname, 'public/images/logo.ico')

  })

  // and load the index.html of the app.
  mainWindow.loadFile('public/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Anystack.ifAuthorized(mainWindow);


  ipc.on("close", () => {
    mainWindow.close();
  })

  ipc.on("minimize", () => {
    mainWindow.minimize();
  })
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  if (!fs.existsSync(path.join(appPath(), "\\UFGO"))) {
    fs.mkdirSync(path.join(appPath(), "\\UFGO"));
  }

  const fullPath = path.join(appPath(), "\\UFGO\\", "data.json");
  let res = fs.existsSync(fullPath);
  if (!res) {
    fs.writeFileSync(fullPath, JSON.stringify({
      history: []
    }));
  }
  if (res) {
    var data = JSON.parse(fs.readFileSync(fullPath).toString());
    // console.log(data);
  }


})


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})