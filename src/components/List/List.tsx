import { Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEmployeeList } from '../../services/employees.rest.service';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalCreate from '../ModalCreate/ModalCreate';
import EmployeeTable from '../Table/Table';
import { TableData } from '../Table/Table.data';
import Notification from '../Notification/Notification';
import './List.css';

const List = () => {
    const [employees, setEmployees] = useState<TableData[]>([]);
    const [openNotification, setOpenNotification] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await getEmployeeList();
                setEmployees(response);
            } catch (error) {
                setOpenNotification(true);
                setEmployees([]);
            }
        })();
      }, []);

    return (
        <div>
            <Notification
                message='Failed to get all employee data!'
                type='error'
                open={openNotification}
                handleClose={() => setOpenNotification(false)}
            />
            <Paper variant="outlined" className="list-actions-paper" >
                <ButtonDelete></ButtonDelete>
                <ModalCreate></ModalCreate>
            </Paper>
            <EmployeeTable rows={employees}></EmployeeTable>
        </div>
    );
};

export default List;