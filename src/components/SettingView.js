import React, { useState } from 'react';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import { TextField, Button, Switch } from '@material-ui/core';

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

    const [ runButtonFlag, setRunButtonFlag ] = useState(true);
    const [ runButtonText, setRunButtonText ] = useState("RUN");
    const [ runButtonColor, setRunButtonColor ] = useState("primary");
    const [ colorModeFlag, setColorModeFlag ] = useState(true);

    const handleChangeRunButton = () => {
        if(runButtonFlag) {
            setRunButtonText("STOP");
            setRunButtonColor("secondary");
            setRunButtonFlag(false);
        } else {
            setRunButtonText("RUN");
            setRunButtonColor("primary");
            setRunButtonFlag(true);
        }
    }
    const handleChangeColorMode = () => {
        colorModeFlag ? setColorModeFlag(false) : setColorModeFlag(true);
    }

    return (
        <div>
            <div>
                <TextField className={classes.textFieldStyle} label="Hashtag" variant="outlined" />
                <TextField className={classes.textFieldStyle} label="Max Length" variant="outlined" />
                <TextField className={classes.textFieldStyle} label="Interval Time" variant="outlined" />
            </div>
            <div>
                <Button className={classes.buttonStyle}
                        variant="contained"
                        color={runButtonColor}
                        onClick={handleChangeRunButton}>
                    {runButtonText}
                </Button>
                <Switch color="primary" onChange={handleChangeColorMode} />{colorModeFlag ? "White Mode" : "Dark Mode"}
            </div>
        </div>
    );
}

export default SettingView;