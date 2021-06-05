import { Modal, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        maxWidth: "90%",
        maxHeight: "85%"
    }
});

const PhotoModal = (props) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            closeAfterTransition
            onClose={props.handleClose}
            open={props.open}
        >
            <>
                {props.photo && <img src={props.photo.image} alt={props.photo.title} className={classes.photo} />}
                <IconButton color="secondary" aria-label="close" onClick={props.handleClose}>
                    <HighlightOffIcon style={{ color: red[50] }} />
                </IconButton>
            </>
        </Modal>
    )
}

export default PhotoModal;