import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { propsButtonAddItem } from '../config/types';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);


export default ({ onClickFunction }: propsButtonAddItem) => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={onClickFunction}
        >
            Add Item
        </Button>
    );
}
