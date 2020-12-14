import React, { createContext, useState, useEffect, useContext } from 'react';

import { itemsContext, propsChildren, rows } from '../config/types';
import { useAuth } from './authContext'
import { loadEmployees } from './employeesItems'

const ItemsContext = createContext<itemsContext>({} as itemsContext);

const ItemsProvider = ({ children }: propsChildren) => {

    const [employeesList, setEmployeesList] = useState<rows[]>([] as rows[]);
    const [loading, setLoading] = useState<boolean>(true);
    const { auth } = useAuth();


    useEffect(() => {
        loadEmployees({ setEmployeesList, setLoading });
    }, [auth])

    return (
        <ItemsContext.Provider value={{ employeesList, setEmployeesList, loading, setLoading }}>
            {children}
        </ItemsContext.Provider>
    )
}
export default ItemsProvider;

export const useItems = () => useContext(ItemsContext);