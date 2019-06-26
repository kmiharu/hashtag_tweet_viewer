import styled from 'styled-components';
import { Button } from '@material-ui/core';

interface ButtonProps {
  isPrimary: boolean;
}

const CustomButton = styled(Button)`
  && {
    padding-left: 40px;
    padding-right: 40px;
  }
`;

export default CustomButton;
