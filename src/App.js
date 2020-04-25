import React, { useState, createContext } from 'react';
import SettingView from './components/SettingView';
import TweetView from './components/TweetView';

export const hashtagContext = createContext();
export const maxLengthContext = createContext();
export const intervalTimeContext = createContext();
export const runButtonContext = createContext();
export const colorModeContext = createContext();

function App() {

    const [ hashtag, setHashtag ] = useState();
    const [ maxLength, setMaxLength ] = useState(240);
    const [ intervalTime, setIntervalTime ] = useState(200);
    const [ colorModeFlag, setColorModeFlag ] = useState(true);
    const [ runButtonFlag, setRunButtonFlag ] = useState(true);

    return (
        <div>
            <hashtagContext.Provider value={[ hashtag, setHashtag ]}>
            <maxLengthContext.Provider value={[ maxLength, setMaxLength ]}>
            <intervalTimeContext.Provider value={[ intervalTime, setIntervalTime ]}>
            <colorModeContext.Provider value={[ colorModeFlag, setColorModeFlag ]}>
            <runButtonContext.Provider value={[ runButtonFlag, setRunButtonFlag ]}>
                <h1>Hashtag Tweet Viewer</h1>
                <SettingView />
                <TweetView />
            </runButtonContext.Provider>
            </colorModeContext.Provider>
            </intervalTimeContext.Provider>
            </maxLengthContext.Provider>
            </hashtagContext.Provider>
        </div>
    );
}

export default App;
