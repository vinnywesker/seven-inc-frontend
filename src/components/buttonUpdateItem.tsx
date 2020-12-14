import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

import { propsButtonDelete } from '../config/types'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const ButtonUpdateItem = (props: propsButtonDelete) => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="small"
            onClick={props.onClickFunction}
        >
            <EditIcon />
        </Button>
    );
}
export default ButtonUpdateItem;
