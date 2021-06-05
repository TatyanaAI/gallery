import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar, Typography } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userPhotosRequest, initPhotos } from "../../store/actions/photosActions";
import BackDrop from '../../components/UI/BackDrop/backDrop'
import PhotoModal from "../../components/UI/PhotoModal/photoModal"

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
  image: {
    width: "100%",
    height: "100%",
    cursor: "pointer"
  },
  user: {
    color: "white"
  }
}));

const UserPhotos = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos.photos);
  const loading = useSelector(state => state.photos.loading);
  const error = useSelector(state => state.photos.error);

  const [modal, setModal] = React.useState({
    open: false,
    photo: null
  });

  useEffect(() => {
    dispatch(initPhotos());
    dispatch(userPhotosRequest(id));
  }, []);

  const handleOpen = (event, photo) => {
    event.stopPropagation();
    setModal({ ...modal, open: true, photo });
  };

  const handleClose = () => {
    setModal({ ...modal, open: false, photo: null });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BackDrop loading={loading} />
      <Typography component="h1" variant="h3" style={{ marginTop: "30px", marginBottom: "30px" }}><b>Gallery of {photos[0] && photos[0].user.username}</b></Typography>

      <GridList cellHeight={300} className={classes.gridList} cols={3} error={error} >
        {photos.map((tile) => (
          <GridListTile key={tile.id} >
            <div>
              <img src={tile.image} alt={tile.title} onClick={(event) => handleOpen(event, tile)} className={classes.image} />
              <GridListTileBar
                title={tile.title}
              />
            </div>
          </GridListTile>
        ))}
      </GridList>

      <PhotoModal
        photo={modal.photo}
        open={modal.open}
        handleClose={handleClose}
      />

    </div>

  );
};

export default UserPhotos;
