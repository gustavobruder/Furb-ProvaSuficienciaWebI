import React, { useState } from 'react';
import './ModalCreate.css';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Notification, { NotificationState } from '../Notification/Notification';
import { createEmployee } from '../../services/employees.service';

interface EmployeeFields {
    name: string;
    salary: number;
    age: number;
}

const ModalCreate = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [employee, setEmployee] = useState<EmployeeFields>({
        name: '',
        salary: 0,
        age: 0,
    });
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        type: 'success',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = async () => {
        setLoading(true);
        try{
            await createEmployee(employee.name, employee.salary, employee.age);
        } catch (error) {
            setNotification({
                open: true,
                message: 'Failed to create employee!',
                type: 'error',
            });
            setLoading(false);
            return;
        }
        setNotification({
            open: true,
            message: 'Employee created successfully!',
            type: 'success',
        });
        setLoading(false);
        setEmployee({name: '', salary: 0, age: 0});
    };

    const validateFields = (fields: EmployeeFields) => {
        const allFieldsValid = fields.name !== '' && fields.salary > 0 && fields.age > 0;
        setDisabled(!allFieldsValid);
    };

    const handleChange = (prop: keyof EmployeeFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const employeeFields = { ...employee, [prop]: event.target.value };
        validateFields(employeeFields);
        setEmployee(employeeFields);
    };

    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                variant="contained"
                className="create-button"
            >
                Create Employee
            </Button>
            <Notification
                message={notification.message}
                type={notification.type}
                open={notification.open}
                handleClose={() => setNotification({
                    open: false, message: '', type: notification.type
                })}
            />
            <Modal open={open}>
                <Box className="modal-box">
                    <h2 className="modal-title">Add employee</h2>
                    <TextField
                        fullWidth
                        required
                        autoComplete='off'
                        onChange={handleChange('name')}
                        id="text-name-outlined-required"
                        label="Employee name"
                        helperText="Field required"
                        margin="normal"
                        value={employee.name}
                    />
                    <TextField
                        fullWidth
                        required
                        autoComplete='off'
                        onChange={handleChange('salary')}
                        id="text-salary-outlined-required"
                        label="Employee salary"
                        helperText="Field required"
                        margin="normal"
                        value={employee.salary > 0 ? employee.salary : ''}
                    />
                    <TextField
                        fullWidth
                        required
                        onChange={handleChange('age')}
                        id="text-age-outlined-number"
                        label="Employee age"
                        type="number"
                        helperText="Field required"
                        margin="normal"
                        value={employee.age > 0 ? employee.age : ''}
                    />
                    <div className="modal-buttons-section">
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <LoadingButton
                            variant="contained"
                            onClick={handleClick}
                            loading={loading}
                            disabled={disabled}
                            loadingPosition="end"
                            endIcon={<SaveIcon />}
                            className="modal-button-save"
                        >
                            Save
                        </LoadingButton>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default ModalCreate;