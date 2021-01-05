import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  active: {
    color: '#077bf7',
  },
  inactive: {
    color: '#5f5f5f',
  }
});

const AuthButtonGroup = (props) => {
  const styles = useStyles();
  return (
    <ButtonGroup>
      <Button onClick={ () => props.setUserIsRegistered(false) }
              variant={"text"}
              className={!props.userIsRegistered ? styles.active : styles.inactive}>Sign up</Button>
      <Button onClick={ () => props.setUserIsRegistered(true) }
              variant={"text"}
              className={props.userIsRegistered ? styles.active : styles.inactive}>Log in</Button>
    </ButtonGroup>
  )
}

export default AuthButtonGroup;