import styled from "styled-components";
import {IconButton} from '@mui/material';


export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 15px;
  top: 15px;
  height: 40px;
  width: 40px;
`;