import { Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEmployees } from '../../services/employees.facade';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ModalCreate from '../ModalCreate/ModalCreate';
import EmployeeTable from '../Table/Table';
import { TableData } from '../Table/Table.data';
import Notification from '../Notification/Notification';
import './List.css';

const List = () => {
    const [employees, setEmployees] = useState<TableData[]>([]);
    const [openNotification, setOpenNotification] = useState(false);
    const [refetch, setRefetch] = useState<number>(0);

    const handleRefetch = () => {
        setRefetch(refetch + 1);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await getEmployees();
                setEmployees(response);
            } catch (error) {
                setOpenNotification(true);
                setEmployees([]);
            }
        })();
      }, [refetch]);

    return (
        <div>
            <Notification
                message='Failed to get all employee data!'
                type='error'
                open={openNotification}
                handleClose={() => setOpenNotification(false)}
            />
            <Paper variant="outlined" className="list-actions-paper" >
                <ButtonDelete onRefetch={handleRefetch}></ButtonDelete>
                <ModalCreate onRefetch={handleRefetch}></ModalCreate>
            </Paper>
            <EmployeeTable rows={employees} onRefetch={handleRefetch}></EmployeeTable>
        </div>
    );
};

export default List;