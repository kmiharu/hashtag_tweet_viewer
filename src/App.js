import React, { useState, createContext } from 'react';
import SettingView from './components/SettingView';
import TweetView from './components/TweetView';

export const runButtonContext = createContext();
export const colorModeContext = createContext();

function App() {

    const [ colorModeFlag, setColorModeFlag ] = useState(true);
    const [ runButtonFlag, setRunButtonFlag ] = useState(true);

    return (
        <div>
            <colorModeContext.Provider value={[ colorModeFlag, setColorModeFlag ]}>
            <runButtonContext.Provider value={[ runButtonFlag, setRunButtonFlag ]}>
                <h1>Hashtag Tweet Viewer</h1>
                <SettingView />
                <TweetView />
            </runButtonContext.Provider>
            </colorModeContext.Provider>
        </div>
    );
}

export default App;
