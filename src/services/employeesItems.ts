import Axios from './axios';
import moment from 'moment'

import { insertItemsParams, resultRows, propsLoadEmployees } from '../config/types';


export const getItems = async () => await Axios.get('/');

export const insertItem = async ({ name, bornDate, salary, position }: insertItemsParams) => {
    return await Axios.post('/', {
        name: name,
        bornDate: bornDate,
        salary: salary,
        position: position,
    })
}

export const deleteItem = async (id: string | number) => {
    return await Axios.delete(`/${id}`);
}

export const updateItem = async (id: string | number, { name, bornDate, salary, position }: insertItemsParams) => {
    return await Axios.put(`/${id}`, {
        name: name,
        bornDate: bornDate,
        salary: salary,
        position: position,
    })
}

export const loadEmployees = async ({ setEmployeesList, setLoading }: propsLoadEmployees) => {
    setLoading(true);
    getItems()
        .then(response => {
            const data = response.data.map((result: resultRows) => {
                return {
                    id: result._id,
                    ...result
                }
            })
            setEmployeesList(data);
            setLoading(false);
        })
}