const electron = require('electron');
const OauthTwitter = require('electron-oauth-twitter');
const Twitter = require('twitter');
// Module to control application life.
const app = electron.app;
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Module to create MENU
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

const path = require('path');
const url = require('url');

const CK = 'EbONJcOqssFttqWt4qA12jn5s';
const CS = '7mV3ukOVWjskrme9LgPCuV53G4oA3w0P7xkDOHYvnarADoSuRc';
let ATK = '';
let ATS = '';
const twitteroauth = new OauthTwitter({
  key: CK,
  secret: CS
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  //mainWindow.loadURL('http://localhost:3000');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // listen hashtag text from renderer process.
  ipcMain.on('Hashtag', (event, arg) => {
    if(0 != arg.length){
      searchTweet(event, arg);
    } else {
      event.sender.send('Text', 'Hashtag text is none.');
    }
  });

  ipcMain.on('testData', (event, arg) => {
    console.log(JSON.parse(arg));
  });


  // Create Menu
  createMenu();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// Create Application Menu
function createMenu() {

  const menu = new Menu();
  menu.append(new MenuItem({
    label: 'Menu',
    submenu: [
      // {
      //   label: 'Configuration',
      //   accelerator: process.platform === 'darwin' ? 'Alt+Cmd+C' : 'Ctrl+Shift+C',
      //   click: () => {
      //     //mainWindow.webContents.send('ping', 'Config')
      //   }
      // },
      {
        label: 'Twitter Auth',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+T' : 'Ctrl+Shift+T',
        click: () => {
          // twitter authentication.
          twitteroauth.startRequest()
            .then((result) => {
              ATK = result.oauth_access_token;
              ATS = result.oauth_access_token_secret;
            }).catch((error) => {
            }
          );
        }
      }
    ]
  }));

  Menu.setApplicationMenu(menu);
}

// Search Hashtag Tweet
function searchTweet(e, word) {
  let client = new Twitter({
    consumer_key: CK,
    consumer_secret: CS,
    access_token_key: ATK,
    access_token_secret: ATS
  });

  let params = {
    q: '#' + word + ' -RT',
    count: 10
  };

  client.get('search/tweets', params, (error, tweets, response) => {
    if(error) throw error;

    // Tweets, No Hit Check.
    if(tweets.statuses[0] === undefined){
      e.sender.send('ScreenName', '');
      e.sender.send('Text', 'No Hit Tweets.');
    } else {
      screen_name = '@' + tweets.statuses[0].user.screen_name;
      text = tweets.statuses[0].text;
      e.sender.send('ScreenName', screen_name);
      e.sender.send('Text', text);
    }

    
    //delete this.client;
  });
}

// Disable HardwareAcceleration.
app.disableHardwareAcceleration();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.