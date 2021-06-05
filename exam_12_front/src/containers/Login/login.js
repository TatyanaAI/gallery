import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from "react-router-dom";
import { Button, Link, Grid, Typography, Container, } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FormElement from "../../components/UI/Form/formElement";
import { loginUser } from "../../store/actions/usersActions";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(3),
    width: "100%"
  },

}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const error = useSelector(state => state.users.error);

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = e => {
    e.preventDefault();
    dispatch(loginUser({ ...state }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {
          error && <Alert
            severity="error"
            className={classes.alert}
          >
            {error.error}
          </Alert>
        }

        <form
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          <Grid container spacing={2}>
            <FormElement
              name="username"
              label="Enter username "
              type="text"
              required={true}
              value={state.username}
              onChange={inputChangeHandler}
              variant="outlined"
            />
            <FormElement
              name="password"
              label=" Enter password"
              type="password"
              required={true}
              value={state.password}
              onChange={inputChangeHandler}
              variant="outlined"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Or <b>Sign up</b>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;