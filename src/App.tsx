import React from 'react';
import SettingView from './components/SettingView';
import TweetView from './components/TweetView';

const App: React.FC = () => {
  return (
    <div>
      <SettingView />
      <TweetView />
    </div>
  );
};

export default App;
