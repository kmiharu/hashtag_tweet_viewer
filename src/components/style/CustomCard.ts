import styled from 'styled-components';
import { Card } from '@material-ui/core';

const CustomCard = styled(Card)`
  && {
    bottom: 8px;
    left: 8px;
    margin: 0 auto;
    max-height: 200px;
    max-width: 80%;
    min-height: 200px;
    position: absolute;
    right: 8px;
  }
`;

export default CustomCard;
