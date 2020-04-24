import React from 'react';
import SettingView from './components/SettingView';
import TweetView from './components/TweetView';

export const hoge = React.createContext();
export const fuga = React.createContext();

function App() {

    const [ h, setH ] = React.useState(100);
    const [ f, setF ] = React.useState(300);

    return (
        <div>
            <hoge.Provider value={[h, setH]}>
            <fuga.Provider value={[f, setF]}>
                <h1>Hashtag Tweet Viewer</h1>
                <SettingView />
                <TweetView />
            </fuga.Provider>
            </hoge.Provider>
        </div>
    );
}

export default App;
