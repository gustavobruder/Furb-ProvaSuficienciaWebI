import React, { useState } from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { deleteEmployee } from '../../services/employees.service';
import './ButtonDelete.css';

const ButtonDelete = () => {
    const [employeeId, setEmployeeId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

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
            console.log('Error on deleting employee -> ', error);
        }
        setEmployeeId(0);
        setDisabled(true);
        setLoading(false);
    };

    return (
        <React.Fragment>
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