import { ReactNode, } from 'react';

export enum alertTypes {
    error = "error",
    warn = "warning",
    info = "info",
    succes = "success"
}

export interface propsAlertBar {
    type: alertTypes;
    children: ReactNode;
    time: number;
    open: boolean;
    state: (open: boolean) => void
}

export interface propsButtonDelete {
    onClickFunction: () => void;
}

export interface authContext {
    auth: boolean;
    usertoken: string | null;
    login(username: string, password: string, remember: boolean): Promise<void>;
    singOut(): void;
}

export interface propsChildren {
    children: ReactNode;
}

// ===============================
export interface rows {
    id: string;
    name: string;
    bornDate: Date;
    salary: number;
    position: string;
}
//=============================
export interface resultRows {
    _id: string;
    name: string;
    bornDate: Date;
    salary: number;
    position: string;
}
export interface itemsContext {
    employeesList: rows[];
    setEmployeesList(params: rows[]): void;
    loading: boolean;
    setLoading(params: boolean): void;
}

export interface propsDialogUpdateItems {
    data: any;
    open: boolean;
    state: (s: any) => void
}

export interface propsButtonAddItem {
    onClickFunction: () => void
}

export interface propsDialogAddItem {
    open: boolean;
    state: (s: boolean) => void
}

export interface insertItemsParams {
    name: string;
    bornDate: Date | null;
    salary: number;
    position: string;
}

export interface propsDataGrid {
    rows: rows[]
}

export interface propsLoadEmployees {
    setLoading(T: boolean): void;
    setEmployeesList(params: rows[]): void;
}