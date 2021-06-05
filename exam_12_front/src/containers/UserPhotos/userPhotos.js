import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar, Typography, Button } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import Alert from '@material-ui/lab/Alert';
import { userPhotosRequest, initPhotos, deletePhoto } from "../../store/actions/photosActions";
import BackDrop from '../../components/UI/BackDrop/backDrop';
import PhotoModal from "../../components/UI/PhotoModal/photoModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center'
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
  deleteButton: {
    position: "absolute",
    top: "3%",
    left: "3%",
    width: "30px",
    height: "30px",
    backgroundColor: "red",
    borderRadius: "10px",
    border: "1px solid white",
    color: "white",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "tomato",
      color: "lightgrey"
    }
  }
}));

const UserPhotos = (props) => {
  const userId = props.match.params.id;

  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos.photos);
  const author = useSelector(state => state.photos.user);
  const loading = useSelector(state => state.photos.loading);
  const error = useSelector(state => state.photos.error);
  const { user } = useSelector(state => state.users);

  const [modal, setModal] = React.useState({
    open: false,
    photo: null
  });

  useEffect(() => {
    dispatch(initPhotos());
    dispatch(userPhotosRequest(userId));
  }, [userId]);

  const handleOpen = (event, photo) => {
    event.stopPropagation();
    setModal({ ...modal, open: true, photo });
  };

  const handleClose = () => {
    setModal({ ...modal, open: false, photo: null });
  };

  const deletePhotoHandler = (event, photoId) => {
    event.stopPropagation();
    dispatch(deletePhoto(photoId, userId));
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BackDrop loading={loading} />
      { (error) && <Alert severity="error" className={classes.alert}> {(error)} </Alert>}
      <Typography variant="h3" style={{ marginTop: "30px", marginBottom: "30px" }}><b>Gallery of {author && author.username}</b></Typography>
      <div>{user && user._id === userId && <Button variant="contained" color="primary" component={Link} to="/add_photo">Add new photo</Button>}</div>
      <GridList cellHeight={300} className={classes.gridList} cols={3} error={error} >
        {photos.map((tile) => (
          <GridListTile key={tile.id} >
            <div>
              {user && user._id === userId && <Button className={classes.deleteButton} onClick={(event) => deletePhotoHandler(event, tile.id)}> <DeleteOutlineRoundedIcon>Delete</DeleteOutlineRoundedIcon> </Button>}
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
