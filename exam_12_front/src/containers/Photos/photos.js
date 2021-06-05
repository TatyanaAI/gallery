import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar, Button } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { photosRequest } from "../../store/actions/photosActions";
import BackDrop from '../../components/UI/BackDrop/backDrop'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    position: "relative"
  },
  publishingStatus: {
    position: "absolute",
    bottom: "13%",
    right: "-9%",
    backgroundColor: "darkred",
    color: "white",
    width: "300px",
    height: "25px",
    borderRadius: 5,
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 13,
    transform: "rotate(-30deg)",
  },
  publishButton: {
    position: "absolute",
    top: "2%",
    left: "25%",
    width: "100px",
    height: "30px",
    backgroundColor: "green",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "lightgreen",
      color: "grey"
    }
  },
  deleteButton: {
    position: "absolute",
    top: "2%",
    left: "1%",
    width: "100px",
    height: "30px",
    backgroundColor: "red",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "tomato",
      color: "lightgrey"
    }
  }

}));

const Photos = () => {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos.photos);
  const loading = useSelector(state => state.photos.loading);
  const error = useSelector(state => state.photos.error);

  useEffect(() => {
    dispatch(photosRequest());
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BackDrop loading={loading} />
      <GridList cellHeight={300} className={classes.gridList} cols={3} error={error} >
        {photos.map((tile) => (
          <GridListTile key={tile.id} >
            <div>
              <img src={tile.image} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<>By: <Link to={"/users/" + tile.user.id} >{tile.user.username}</Link></>}
              />
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>

  );
};

export default Photos;
