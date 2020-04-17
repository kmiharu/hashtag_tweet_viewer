import React from 'react';
import SettingView from './components/SettingView';
import TweetView from './components/TweetView';

function App() {
  return (
    <div>
      <h1>Hashtag Tweet Viewer</h1>
      <SettingView />
      <TweetView />
    </div>
  );
}

export default App;
