import React from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => {
    return {
        button: {
            border: "2px solid white",
            borderRadius: "5px",
            textDecoration: "none",
            marginRight: "5px",
            "&:hover": {
                backgroundColor: "white",
                color: "grey"
            }
        }

    };
});

const AnonymousMenu = () => {
    const classes = useStyles();
    return (
        <>  
        <Button component={Link} to="/register" color="inherit" className={classes.button}> <b>Sign Up</b></Button>
        <Button component={Link} to="/login" color="inherit" className={classes.button}> Sign In </Button>
        </>
    );
};

export default AnonymousMenu;