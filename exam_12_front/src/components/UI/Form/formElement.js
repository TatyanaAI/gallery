import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid, MenuItem } from "@material-ui/core";

const FormElement = (props) => {
    let inputChildren = null;
    if (props.type === "select") {
        inputChildren = props.options.map((option) => {
            return (
                <MenuItem key={option.id} value={option.id}>
                    {option.name || option.title}
                </MenuItem>
            )
        })
    }

    return (
        <Grid item xs={12}>
            <TextField
                variant={props.variant}
                fullWidth
                required={props.required}
                id={props.name}
                type={props.type}
                multiline={props.multiline}
                rows={3}
                label={props.label}
                name={props.name}
                autoComplete={props.name}
                value={props.value}
                onChange={props.onChange}
                error={!!props.error}
                helperText={props.error}
                select={props.select}
            >
                {inputChildren}
            </TextField >
        </Grid>
    );

};

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    multiline: PropTypes.bool,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.number,
    variant: PropTypes.string
};

export default FormElement;
