import React from 'react';
import { CardContent, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomCard from './style/CustomCard';

const TweetView: React.FC = () => {
  return (
    <>
      <CustomCard>
        <CardContent>
          <Typography variant="h3">
            <FontAwesomeIcon icon={['fab', 'twitter']} /> &#35;&nbsp;hirony_live
          </Typography>
          <Typography variant="h4">@_hirony</Typography>
          <Typography variant="h5">
            Hello World Hello World Hello World Hello World Hello World Hello
            World Hello World Hello World Hello World Hello World Hello World
            Hello World Hello World Hello World Hello World Hello World Hello
            World Hello World Hello World Hello World Hello World Hello World
            Hello World Hello World Hello World Hello World Hello World Hello
            World Hello World Hello World Hello World Hello World Hello World
            Hello World Hello World Hello World Hello World Hello World Hello
            World Hello World Hello World Hello World Hello World Hello World
            Hello World #hirony_live
          </Typography>
        </CardContent>
      </CustomCard>
    </>
  );
};

export default TweetView;
