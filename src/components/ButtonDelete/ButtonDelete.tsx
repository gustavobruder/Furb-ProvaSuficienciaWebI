import React, { useState } from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Notification, { NotificationState } from '../Notification/Notification';
import { deleteEmployee } from '../../services/employees.rest.service';
import './ButtonDelete.css';

const ButtonDelete = () => {
    const [employeeId, setEmployeeId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        type: 'success',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = +event.target.value;
        setEmployeeId(id);
        setDisabled(id <= 0);
    };

    const handleClick = async () => {
        setLoading(true);
        try{
            await deleteEmployee(employeeId);
        } catch (error) {
            setNotification({
                open: true,
                message: 'Failed to delete employee!',
                type: 'error',
            });
            setLoading(false);
            return;
        }
        setNotification({
            open: true,
            message: 'Employee deleted successfully!',
            type: 'success',
        });
        setEmployeeId(0);
        setDisabled(true);
        setLoading(false);
    };

    return (
        <React.Fragment>
            <Notification
                message={notification.message}
                type={notification.type}
                open={notification.open}
                handleClose={() => setNotification({
                    open: false, message: '', type: notification.type
                })}
            />
            <TextField
                size="small"
                required
                autoComplete='off'
                onChange={handleChange}
                id="text-id-outlined-required"
                label="Employee id"
                type="number"
                className="delete-text-employee-id"
                value={employeeId > 0 ? employeeId : ''}
            />
            <LoadingButton
                color="error"
                variant="contained"
                loading={loading}
                disabled={disabled}
                onClick={handleClick}
                className="delete-button-employee-id"
            >
                Delete Employee
            </LoadingButton>
        </React.Fragment>
    );
};

export default ButtonDelete;