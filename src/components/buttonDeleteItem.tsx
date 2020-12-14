import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { propsButtonDelete } from '../config/types'




export default (props: propsButtonDelete) => {

    return (
        <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={props.onClickFunction}
        >
            <DeleteIcon />
        </Button>
    );
}
