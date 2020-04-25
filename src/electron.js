const electron = require('electron');
const OauthTwitter = require('electron-oauth-twitter');
const Twitter = require('twitter');
const { app, ipcMain } = electron;
const BrowserWindow = electron.BrowserWindow;

const consumerKey = 'oJXc4X0uSmHOZT5UKQsy7OTaX';
const consumerSecret = 'BNnEv0rVzcY2who2v7JuF3x0zKPWE485GYjaounn81OOTnMxaw';
let accessToken = "";
let accessTokenSecret = "";
let mainWindow;

const twitterOauth = new OauthTwitter({
  key: consumerKey,
  secret: consumerSecret
});

const client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessToken,
  access_token_secret: accessTokenSecret
});

// TODO: AT, ATS の保存の仕方を検討
twitterOauth.startRequest().then(function(result) {
  accessToken = result.oauth_access_token;
  accessTokenSecret = result.oauth_access_token_secret;
  mainWindow.webContents.executeJavaScript('localStorage.setItem("ACCESS_TOKEN", "' + accessToken + '");', true);
  mainWindow.webContents.executeJavaScript('localStorage.setItem("ACCESS_TOKEN_SECRET", "' + accessTokenSecret + '");', true);
}).catch((error) => {
  console.error(error, error.stack);
});

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setMenu(null);
  //mainWindow.loadURL('https://musing-booth-a199e7.netlify.app/');
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', function () {
    mainWindow = null
  })
};

app.disableHardwareAcceleration();
app.on('ready', createWindow);
app.allowRendererProcessReuse = false;
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('SEARCH', (event, args) => {
  client.get('search/tweets', { q: args, count: 10 }, (error, data, response) => {
    if( data.statuses[0] === undefined ) {
      event.sender.send('TWEETS', 'No hit.');
    } else {
      event.sender.send('TWEETS', data.statuses[0].text);
      event.sender.send('SCREEN_NAME', data.statuses[0].user.screen_name);
    }
  });
});