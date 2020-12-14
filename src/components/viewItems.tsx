import React, { useState, useMemo } from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


import ButtonDelete from './buttonDeleteItem';
import ButtonsActions from './buttonAddItem'
import ButtonUpdateItem from './buttonUpdateItem';
import { alertTypes, propsDataGrid } from '../config/types';
import { deleteItem } from '../services/employeesItems'
import DialogAddItem from './dialogAddItem';
import DialogUpdateItem from './dialogUpdateItem';
import AlertBar from './alertBar';
import LoadingBar from './loadingBar';
import { loadEmployees } from '../services/employeesItems';
import { useItems } from '../services/itemsContext';

const useStyles = makeStyles((theme) => ({
    dataGrids: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.default,
    }
}));



const DataGridDemo = (props: propsDataGrid) => {
    const classes = useStyles();

    const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false);
    const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>({});
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { loading, setEmployeesList, setLoading } = useItems();


    const columns = (): ColDef[] => {
        const schemaColumns: ColDef[] = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Nome do Funcionário', width: 280 },
            { field: 'bornDate', headerName: 'Data de Nascimento', width: 180 },
            { field: 'salary', headerName: 'Salário', type: 'number', width: 90 },
            { field: 'position', headerName: 'Cargo', width: 200 },
            {
                field: 'actions', headerName: 'Acões', width: 180, renderCell: (params: ValueFormatterParams) => {
                    return (<div><ButtonUpdateItem onClickFunction={() => clickUpdateItem(params)} />
                        <ButtonDelete onClickFunction={() => clickRemoveItem(params)} /></div>)
                }
            },
        ];
        return schemaColumns;
    }


    const dataGridView = useMemo(() => (
        <DataGrid
            className={classes.dataGrids}
            rows={props.rows}
            columns={columns()}
            pageSize={7}
            components={{
                loadingOverlay: LoadingBar,
            }}
            loading={loading}
        />
    ), [props.rows, classes.dataGrids, loading])

    const clickRemoveItem = (params: ValueFormatterParams) => {
        deleteItem(params.row.id)
            .then(response => {
                loadEmployees({ setEmployeesList, setLoading });
                setOpenAlert(true);
            })
    }

    const clickUpdateItem = (params: ValueFormatterParams) => {
        setSelected(params.row);
        setOpenDialogUpdate(true);
    }

    const onClickHandle = () => setOpenDialogAdd(true);

    const AlertBarInfo = useMemo(() => (
        <AlertBar open={openAlert} state={setOpenAlert} time={5000} type={alertTypes.error} >Funcionario removido com Sucesso!</AlertBar>
    ), [openAlert])

    return (
        <>
            {AlertBarInfo}
            <DialogAddItem open={openDialogAdd} state={setOpenDialogAdd} />
            <DialogUpdateItem data={selected} open={openDialogUpdate} state={setOpenDialogUpdate} />
            <Container component="main">
                <div style={{ height: 500, width: '100%' }}>
                    {dataGridView}
                </div>
                <ButtonsActions onClickFunction={onClickHandle} />
            </Container>
        </>
    );
}


export default DataGridDemo;

