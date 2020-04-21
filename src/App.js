import React from 'react';
import SettingView from './components/SettingView';
import TweetView from './components/TweetView';

export const hoge = React.createContext();

function App() {

  const [ h, setH ] = React.useState(100)

  return (
    <div>
      <hoge.Provider value={[h, setH]}>
        <h1>Hashtag Tweet Viewer</h1>
        <SettingView />
        <TweetView />
      </hoge.Provider>
    </div>
  );
}

export default App;
