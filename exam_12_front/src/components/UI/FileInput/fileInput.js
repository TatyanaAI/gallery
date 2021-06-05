import React, { useState, useRef } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    zIndex: 1
  },
  file: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    left: 0,
    opacity: 0
  },
  fileInput: {
    position: 'relative',
    zIndex: 3
  }
}));

const FileInput = props => {
  const classes = useStyles();
  const inputRef = useRef();
  const [filename, setFilename] = useState("");

  const fileChangeHandler = e => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    props.onChange(e);
  };

  const activateInput = () => {
    inputRef.current.click();
  };

  return (
    <div className={classes.wrapper}>
      <input
        className={classes.file}
        type="file"
        name={props.name}
        ref={inputRef}
        onChange={fileChangeHandler}
        required
      />
      <Grid container direction="row" spacing={2} alignItems="center" className={classes.fileInput}>
        <Grid item>
          <TextField
            disabled
            fullWidth
            label={props.label}
            value={filename}
            onClick={activateInput}
            required
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FileInput;