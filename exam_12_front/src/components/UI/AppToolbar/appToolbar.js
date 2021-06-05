import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import AnonymousMenu from "../../UI/AppToolbar/Menus/anonymousMenu";
import UserMenu from "../../UI/AppToolbar/Menus/userMenu"
import { logoutUser } from "../../../store/actions/usersActions"


const useStyles = makeStyles(theme => {
  return {
    appLink: {
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        color: "dodgerblue"
      }
    },
    staticToolbar: {
      marginBottom: theme.spacing(2),
    },
    appBar: {
      backgroundColor: "black"
    },
    logo: {
      marginRight: '5px'
    },
    buttonItem: {
      width: "20%"
    },

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

const AppToolbar = (props) => {
  const user = useSelector(state => state.users.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logoutUser());
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <Grid container item justify="flex-start" alignItems="center" >
            <Link to={'/'} className={classes.appLink} >
              <PhotoCameraIcon className={classes.logo} />
            </Link>
            <Typography variant="h4">
              <Link to={'/'} className={classes.appLink} >Gallery App</Link>
            </Typography>
          </Grid>
          <Grid item className={classes.buttonItem}>
            {user ? (<UserMenu user={user} onLogoutClick={onLogoutClick} />) : (<AnonymousMenu />)}
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar} />
    </>
  );
};

export default AppToolbar;

