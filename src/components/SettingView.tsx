import React from 'react';
import { Switch, TextField } from '@material-ui/core';
import CustomUl from './style/CustomUl';
import CustomButton from './style/CustomButton';

const SettingView: React.FC = () => {
  return (
    <>
      <CustomUl>
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
      </CustomUl>
    </>
  );
};

export default SettingView;
