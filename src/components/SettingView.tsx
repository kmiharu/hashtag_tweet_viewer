import React from 'react';
import { Switch, TextField } from '@material-ui/core';
import Ul from './Ul';
import CustomButton from './CustomButton';

const SettingView: React.FC = () => {
  return (
    <>
      <Ul>
        <li>
          <TextField label="Hashtag" type="text" variant="filled" />
        </li>
        <li>
          <TextField
            label="Max Tweet Length"
            type="number"
            defaultValue="280"
            variant="filled"
          />
        </li>
        <li>
          <TextField
            label="Interval Time(ms)"
            type="number"
            defaultValue="3000"
            variant="filled"
          />
        </li>
        <li>
          <Switch color="primary" /> ColorMode
        </li>
        <li>
          <CustomButton variant="contained" color="primary">
            Run
          </CustomButton>
        </li>
      </Ul>
    </>
  );
};

export default SettingView;
