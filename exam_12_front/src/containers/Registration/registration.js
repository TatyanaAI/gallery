import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from "../../store/actions/usersActions";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Button, Link } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import FormElement from '../../components/UI/Form/formElement'


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Registration = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const submitFormHandler = event => {
        event.preventDefault();

        dispatch(registerUser({ ...state }));
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Sign up
            </Typography>
                <form className={classes.form} onSubmit={submitFormHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormElement
                                required
                                name="username"
                                label="Username"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={state.username}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormElement
                                required
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={state.password}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
              </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} variant="body2" to="/login">
                                Already have an account? <b> Sign in</b>

                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

}

export default Registration;