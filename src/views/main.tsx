import React from 'react';

import ViewItems from '../components/viewItems';
import MenuBar from '../components/menuBar';
import { useItems } from '../services/itemsContext';



const Main = () => {

    const { employeesList } = useItems();

    return (
        <>
            <MenuBar />
            <ViewItems rows={employeesList} />
        </>
    );
}

export default Main;