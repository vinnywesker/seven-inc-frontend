import React, { useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

import { updateItem } from '../services/employeesItems';
import AlertBar from './alertBar';
import { alertTypes, propsDialogUpdateItems } from '../config/types';
import { useItems } from '../services/itemsContext'
import { loadEmployees } from '../services/employeesItems'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

export default function FormDialog({ data, open, state }: propsDialogUpdateItems) {

    const classes = useStyles();

    const { setEmployeesList, setLoading } = useItems();

    const [name, setName] = useState<string | null>(null);
    const [date, setDate] = useState<string>('');
    const [salary, setSalary] = useState<number | null>(null);
    const [position, setPosition] = useState<string | null>(null);
    const [openAlert, setOpenAlert] = useState(false);

    const handleClose = () => {
        state(false);
    }

    useEffect(() => {
        setName(data.name);
        setDate(data.bornDate);
        setSalary(data.salary);
        setPosition(data.position);
    }, [data]);

    const handleUpdate = () => {
        if (!name || !salary || !position || (date.length < 10 || date === 'Invalid date')) { alert("Nenhum campo pode ficar vazio."); return; }
        state(false);
        updateItem(data.id, { name: name, bornDate: date, salary: salary, position: position })
            .then(response => {

                loadEmployees({ setEmployeesList, setLoading });

                setOpenAlert(true);
            })
    }

    const AlertBarInfo = useMemo(() => (
        <AlertBar open={openAlert} state={setOpenAlert} time={3000} type={alertTypes.succes} >Funcionario modificado com Sucesso!</AlertBar>
    ), [openAlert])

    return (
        <div>
            {AlertBarInfo}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar Itens</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Altere as informações do funcionário, e clique em 'confirmar'.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={name}
                        id="name"
                        label="Nome"
                        fullWidth
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        id="date"
                        label="Data de nascimento"
                        type="date"
                        defaultValue={moment(date).format('YYYY-MM-DD')}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            setDate(moment(e.target.value).format('YYYY/MM/DD'));
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="salary"
                        defaultValue={salary}
                        label="Salario"
                        type="number"
                        fullWidth
                        onChange={(e) => {
                            setSalary(parseFloat(e.target.value));
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="position"
                        defaultValue={position}
                        label="Cargo"
                        fullWidth
                        onChange={(e) => {
                            setPosition(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
