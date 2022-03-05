import { Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEmployeeList } from '../../services/employees.service';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalCreate from '../ModalCreate/ModalCreate';
import EmployeeTable from '../Table/Table';
import { TableData } from '../Table/Table.data';
import './List.css';

const List = () => {
    const [employees, setEmployees] = useState<TableData[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getEmployeeList();
                setEmployees(response);
            } catch (error) {
                console.log('Error getting employee list -> ', error);
                setEmployees([]);
            }
        })();
      }, []);

    return (
        <div>
            <Paper variant="outlined" className="list-actions-paper" >
                <ButtonDelete></ButtonDelete>
                <ModalCreate></ModalCreate>
            </Paper>
            <EmployeeTable rows={employees}></EmployeeTable>
        </div>
    );
};

export default List;