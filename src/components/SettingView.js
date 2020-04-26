import React, { useState, useContext } from 'react';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import { TextField, Button, Switch } from '@material-ui/core';
import {
    colorModeContext,
    runButtonContext,
    hashtagContext,
    maxLengthContext,
    intervalTimeContext,
    fadeAnimeContext
} from '../App.js';
const { ipcRenderer } = window.require('electron');

let timerId;

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

function SettingView() {
    const classes = useStyles();

    const [ hashtag, setHashtag ] = useContext(hashtagContext);
    const [ maxLength, setMaxLength ] = useContext(maxLengthContext);
    const [ intervalTime, setIntervalTime ] = useContext(intervalTimeContext);
    const [ runButtonFlag, setRunButtonFlag ] = useContext(runButtonContext);
    const [ runButtonText, setRunButtonText ] = useState("RUN");
    const [ runButtonColor, setRunButtonColor ] = useState("primary");
    const [ colorModeFlag, setColorModeFlag ] = useContext(colorModeContext);
    const [ colorModeText, setColorModeText ] = useState("White Mode");
    // eslint-disable-next-line no-unused-vars
    const [ fadeAnimeFlag, setFadeAnimeFlag ] = useContext(fadeAnimeContext);

    const handleRunButtonMethod = () => {
        if (runButtonFlag) {
            setRunButtonText("STOP");
            setRunButtonColor("secondary");
            setRunButtonFlag(false);
            ipcRenderer.send('SEARCH', hashtag);
            timerId = setInterval(() => {
                setFadeAnimeFlag(false);
                ipcRenderer.send('SEARCH', hashtag);
            }, intervalTime);
        } else {
            clearInterval(timerId);
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
    const handleChangeHashtag = (event) => {
        setHashtag(event.target.value);
    };
    const handleChangeMaxLength = (event) => {
        if(event.target.value.match(/^[0-9\b]+$/)){
            setMaxLength(event.target.value);
        } else {
            setMaxLength(240);
        }
    };
    const handleChangeIntervalTime = (event) => {
        if(event.target.value.match(/^[0-9\b]+$/)){
            setIntervalTime(event.target.value);
        } else {
            setIntervalTime(10000);
        }
    }

    ipcRenderer.on('STOP_SEARCH', (event, args) => {
        clearInterval(timerId);
        setRunButtonText("RUN");
        setRunButtonColor("primary");
        setRunButtonFlag(true);
    });

    return (
        <div>
            <div>
                <TextField
                    className={classes.textFieldStyle}
                    label="Hashtag"
                    variant="outlined"
                    onChange={handleChangeHashtag}
                    disabled={!runButtonFlag} />
                <TextField
                    className={classes.textFieldStyle}
                    label="Max Length"
                    variant="outlined"
                    defaultValue={maxLength}
                    onChange={handleChangeMaxLength}
                    disabled={!runButtonFlag} />
                <TextField
                    className={classes.textFieldStyle}
                    label="Interval Time"
                    variant="outlined"
                    defaultValue={intervalTime}
                    onChange={handleChangeIntervalTime}
                    disabled={!runButtonFlag} />
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