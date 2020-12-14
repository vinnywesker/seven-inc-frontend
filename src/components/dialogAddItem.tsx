import React, { useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

import { insertItem } from '../services/employeesItems';
import AlertBar from './alertBar';
import { alertTypes, propsDialogAddItem } from '../config/types';
import { loadEmployees } from '../services/employeesItems'
import { useItems } from '../services/itemsContext'

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

function FormDialog({ open, state }: propsDialogAddItem) {
    const classes = useStyles();

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('2000/01/01');
    const [salary, setSalary] = useState<number>(0);
    const [position, setPosition] = useState<string>('');
    const [openAlert, setOpenAlert] = useState(false);
    const { setEmployeesList, setLoading } = useItems();

    const handleClose = () => {
        state(false);
    }

    const handleInsert = () => {
        if (!name || !salary || !position || (date.length < 10 || date === 'Invalid date')) { alert("Nenhum campo pode ficar vazio."); return; }
        state(false);
        insertItem({ name: name, bornDate: date, salary: salary, position: position })
            .then(response => {

                loadEmployees({ setEmployeesList, setLoading });

                setOpenAlert(true);
            })
    }

    const AlertBarInfo = useMemo(() => (
        <AlertBar open={openAlert} state={setOpenAlert} time={3000} type={alertTypes.succes} >Funcionario adicionado com Sucesso!</AlertBar>
    ), [openAlert]);

    return (
        <div>
            {AlertBarInfo}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar Itens</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Digite os dados do funcionário no qual deseja adicionar à lista.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
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
                        defaultValue="2000-01-01"
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
                    <Button onClick={handleInsert} color="primary">
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default FormDialog;