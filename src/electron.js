const electron = require('electron');
const OauthTwitter = require('electron-oauth-twitter');
const Twitter = require('twitter');
const Store = require('electron-store');
const { app, ipcMain } = electron;
const BrowserWindow = electron.BrowserWindow;
const store = new Store();

const consumerKey = 'oJXc4X0uSmHOZT5UKQsy7OTaX';
const consumerSecret = 'BNnEv0rVzcY2who2v7JuF3x0zKPWE485GYjaounn81OOTnMxaw';
const twitterOauth = new OauthTwitter({ key: consumerKey, secret: consumerSecret });
let accessToken = store.get('ACCESS_TOKEN');
let accessTokenSecret = store.get('ACCESS_TOKEN_SECRET');
let mainWindow;
let client;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true },
    title: 'Hashtag Tweet Viewer'
  });
  
  if( accessToken === accessTokenSecret ){
    twitterOauth.startRequest().then(function(result) {
      store.set('ACCESS_TOKEN', result.oauth_access_token);
      store.set('ACCESS_TOKEN_SECRET', result.oauth_access_token_secret);
      accessToken = result.oauth_access_token;
      accessTokenSecret = result.oauth_access_token_secret;
    }).catch((error) => {
      console.error(error, error.stack);
    });
  };

  ipcMain.on('SEARCH', (event, args) => {
    const params = {
      q: '#' + args + ' -RT',
      count: 10
    };

    client = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessToken,
      access_token_secret: accessTokenSecret
    });

    // TODO: error dialog の変更
    // TODO: ログインしてないときの誘導処理
    client.get('search/tweets', params, (error, data, response) => {
      // if(error) throw error;
      if(error) {
        event.sender.send('STOP_SEARCH', 'stop');
        twitterOauth.startRequest().then(function(result) {
          accessToken = result.oauth_access_token;
          accessTokenSecret = result.oauth_access_token_secret;
          store.set('ACCESS_TOKEN', result.oauth_access_token);
          store.set('ACCESS_TOKEN_SECRET', result.oauth_access_token_secret);
        }).catch((error) => {
          console.error(error, error.stack);
        });
        client = new Twitter({
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
          access_token_key: accessToken,
          access_token_secret: accessTokenSecret
        });
      };

      if( data.statuses[0] === undefined ) {
        event.sender.send('TWEETS', 'No hit.');
        event.sender.send('SCREEN_NAME', '');
      } else {
        event.sender.send('TWEETS', data.statuses[0].text);
        event.sender.send('SCREEN_NAME', data.statuses[0].user.screen_name);
      }
    });
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL('https://musing-booth-a199e7.netlify.app/');
  // mainWindow.loadURL('http://localhost:3000');
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
