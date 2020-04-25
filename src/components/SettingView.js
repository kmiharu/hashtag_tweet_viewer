import React, { useState, useContext } from 'react';
import Twitter from 'twitter';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import { TextField, Button, Switch } from '@material-ui/core';
import { colorModeContext, runButtonContext } from '../App.js';

const consumerKey = 'oJXc4X0uSmHOZT5UKQsy7OTaX';
const consumerSecret = 'BNnEv0rVzcY2who2v7JuF3x0zKPWE485GYjaounn81OOTnMxaw';
const accessToken = localStorage.getItem("ACCESS_TOKEN");
const accessTokenSecret = localStorage.getItem("ACCESS_TOKEN_SECRET");
const client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
});

const useStyles = makeStyles((theme) =>
    createStyles({
        textFieldStyle: {
            marginRight: 5,
            marginBottom: 5
        },
        buttonStyle: {
            marginRight: 5,
            marginBottom: 5
        }
    })
)

function searchTweets() {
    let tweets = "test tweets";
    client.get('search/tweets', { q: '#たまみるく兄弟'}, (error, data, response) => {
        // tweets = data;
        console.log(data);
    })
    return tweets;
}

function SettingView() {
    const classes = useStyles();

    const [ runButtonFlag, setRunButtonFlag ] = useContext(runButtonContext);
    const [ runButtonText, setRunButtonText ] = useState("RUN");
    const [ runButtonColor, setRunButtonColor ] = useState("primary");
    const [ colorModeFlag, setColorModeFlag ] = useContext(colorModeContext);
    const [ colorModeText, setColorModeText ] = useState("White Mode");

    const [ hoge, setHoge ] = useState();

    const handleRunButtonMethod = () => {
        if (runButtonFlag) {
            setRunButtonText("STOP");
            setRunButtonColor("secondary");
            setRunButtonFlag(false);
            setHoge(searchTweets());
        } else {
            setRunButtonText("RUN");
            setRunButtonColor("primary");
            setRunButtonFlag(true);
        }
    };
    const handleChangeColorMode = () => {
        if (colorModeFlag) {
            setColorModeFlag(false);
            setColorModeText("Dark Mode");
        } else {
            setColorModeFlag(true);
            setColorModeText("White Mode");
        }
    };

    return (
        <div>
            {hoge}
            <div>
                <TextField className={classes.textFieldStyle} label="Hashtag" variant="outlined" />
                <TextField className={classes.textFieldStyle} label="Max Length" variant="outlined" />
                <TextField className={classes.textFieldStyle} label="Interval Time" variant="outlined" />
            </div>
            <div>
                <ul>
                    <li>ck: {consumerKey}</li>
                    <li>cs: {consumerSecret}</li>
                    <li>at: {accessToken}</li>
                    <li>ats: {accessTokenSecret}</li>
                </ul>
            </div>
            <div>
                <Button className={classes.buttonStyle}
                        variant="contained"
                        color={runButtonColor}
                        onClick={handleRunButtonMethod}>
                    {runButtonText}
                </Button>
                <Switch color="primary" onChange={handleChangeColorMode} />{colorModeText}                
            </div>
        </div>
    );
}

export default SettingView;