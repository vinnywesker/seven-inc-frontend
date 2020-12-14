import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { propsAlertBar } from '../config/types'

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default ({ children, time, type, open, state }: propsAlertBar) => {
    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return;

        state(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={time} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {children}
                </Alert>
            </Snackbar>
        </div>
    );
}