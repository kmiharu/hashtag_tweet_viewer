import React from 'react';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        textFieldStyle: {
            marginRight: 5,
            marginBottom: 5
        }
    })
)

function SettingView() {
    const classes = useStyles();

    return (
        <div>
            <TextField className={classes.textFieldStyle} label="Hashtag" variant="outlined" />
            <TextField className={classes.textFieldStyle} label="Max Length" variant="outlined" />
            <TextField className={classes.textFieldStyle} label="Interval Time" variant="outlined" />
        </div>
    );
}

export default SettingView;