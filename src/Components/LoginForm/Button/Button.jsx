import React from "react";
import {styled} from "@material-ui/core/";
import {Button as MaterialButton, createMuiTheme, ThemeProvider} from '@material-ui/core';

const LoginFormButton = styled(MaterialButton)({
  borderRadius: '5px',
  width: '100%',
  color: 'black',
});

const blueTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2175cf',
    },
  },
});

const Button = props => {
    return (
      <ThemeProvider theme={blueTheme}>
        <LoginFormButton onClick={props.onClick}
                         variant={props.variant}
                         type={props.type} color='primary'>
          {props.text}
        </LoginFormButton>
      </ThemeProvider>
    )
};

export default Button;