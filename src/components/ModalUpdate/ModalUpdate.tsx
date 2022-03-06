import React, { useState } from 'react';
import './ModalUpdate.css';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Notification, { NotificationState } from '../Notification/Notification';
import { updateEmployee } from '../../services/employees.rest.service';

interface EmployeeFields {
    name: string;
    salary: number;
    age: number;
}

interface ModalUpdateProps {
    modalOpen: boolean;
    handleClose: () => void;
    employeeId: number;
    employeeName: string;
    employeeSalary: number;
    employeeAge: number;
}

const ModalUpdate = (props: ModalUpdateProps) => {
    const {
        modalOpen,
        handleClose,
        employeeId,
        employeeName,
        employeeSalary,
        employeeAge
    } = props;

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [employee, setEmployee] = useState<EmployeeFields>({
        name: employeeName,
        salary: employeeSalary,
        age: employeeAge,
    });
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        type: 'success',
    });

    const handleClick = async () => {
        setLoading(true);
        try{
            await updateEmployee(employeeId, employee.name, employee.salary, employee.age);
        } catch (error) {
            setNotification({
                open: true,
                message: 'Failed to update employee!',
                type: 'error',
            });
            setLoading(false);
            return;
        }
        setNotification({
            open: true,
            message: 'Employee updated successfully!',
            type: 'success',
        });
        setLoading(false);
        setDisabled(true);
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
            <Notification
                message={notification.message}
                type={notification.type}
                open={notification.open}
                handleClose={() => setNotification({
                    open: false, message: '', type: notification.type
                })}
            />
            <Modal open={modalOpen}>
                <Box className="modal-update-box">
                    <h2 className="modal-update-title">Update employee</h2>
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
                    <div className="modal-update-buttons-section">
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
                            className="modal-update-button-save"
                        >
                            Save
                        </LoadingButton>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default ModalUpdate;