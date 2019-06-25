/* eslint-disable import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app, BrowserWindow } = require('electron');

let win;

const appLoad = () => {
  win.loadURL('http://localhost:3000');
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  appLoad();

  win.on('closed', () => {
    win = null;
  });
};

// Disable HardwareAcceleration.
app.disableHardwareAcceleration();

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
