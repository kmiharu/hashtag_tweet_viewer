import React, { useState, createContext } from 'react';
import SettingView from './components/SettingView';
import TweetView from './components/TweetView';

export const colorModeContext = createContext();

function App() {

    const [ colorModeFlag, setColorModeFlag ] = useState(true);

    return (
        <div>
            <colorModeContext.Provider value={[ colorModeFlag, setColorModeFlag ]}>
                <h1>Hashtag Tweet Viewer</h1>
                <SettingView />
                <TweetView />
            </colorModeContext.Provider>
        </div>
    );
}

export default App;
