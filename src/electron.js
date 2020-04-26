const electron = require('electron');
const OauthTwitter = require('electron-oauth-twitter');
const Twitter = require('twitter');
const Store = require('electron-store');
const { app, ipcMain } = electron;
const BrowserWindow = electron.BrowserWindow;

const store = new Store();
let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const consumerKey = 'oJXc4X0uSmHOZT5UKQsy7OTaX';
  const consumerSecret = 'BNnEv0rVzcY2who2v7JuF3x0zKPWE485GYjaounn81OOTnMxaw';
  const accessToken = store.get('ACCESS_TOKEN');
  const accessTokenSecret = store.get('ACCESS_TOKEN_SECRET');

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

  console.log(accessToken);
  console.log(accessTokenSecret);
  
  if( accessToken === accessTokenSecret ){
    twitterOauth.startRequest().then(function(result) {
      store.set('ACCESS_TOKEN', result.oauth_access_token);
      store.set('ACCESS_TOKEN_SECRET', result.oauth_access_token_secret);
    }).catch((error) => {
      console.error(error, error.stack);
    });
  };

  ipcMain.on('SEARCH', (event, args) => {
    const params = {
      q: '#' + args + '-RT',
      count: 10
    }
    client.get('search/tweets', params, (error, data, response) => {
      if(error) throw error;

      if( data.statuses[0] === undefined ) {
        event.sender.send('TWEETS', 'No hit.');
      } else {
        event.sender.send('TWEETS', data.statuses[0].text);
        event.sender.send('SCREEN_NAME', data.statuses[0].user.screen_name);
      }
    });
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
