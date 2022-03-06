import { TableData } from '../components/Table/Table.data';
import {
    getEmployeeList as getEmployeesRest,
    createEmployee as createEmployeeRest,
    updateEmployee as updateEmployeeRest,
    deleteEmployee as deleteEmployeeRest,
} from './employees.rest.service';
import {
    getAllItems,
    saveItem,
    updateItem,
    deleteItem,
} from './employees.storage.service';

const enableDummyApi = true;

const getEmployees = async (): Promise<TableData[]>  => {
    if (enableDummyApi) {
        return await getEmployeesRest();
    }
    const items = getAllItems();
    return items.map(x => {
        return {
            id: x.id,
            employeeName: x.name,
            employeeSalary: x.salary,
            employeeAge: x.age,
        };
    })
};

const createEmployee = async (name: string, salary: number, age: number) => {
    if (enableDummyApi) {
        return await createEmployeeRest(name, salary, age);
    }
    return saveItem(name, salary, age);
};

const updateEmployee = async (id: number, name: string, salary: number, age: number) => {
    if (enableDummyApi) {
        return await updateEmployeeRest(id, name, salary, age);
    }
    return updateItem(id, name, salary, age);
};

const deleteEmployee = async (id: number) => {
    if (enableDummyApi) {
        return await deleteEmployeeRest(id);
    }
    return deleteItem(id);
};

export {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};