import { StorageError } from "../metadata/storage-error.model";

interface EmployeeStorage {
    id: number;
    name: string;
    salary: number;
    age: number;
}

const saveItem = (name: string, salary: number, age: number): void => {
    var employeesJson = localStorage.getItem('employees');

    if (employeesJson == null) {
        localStorage.setItem('employees', JSON.stringify([{
            id: 1,
            name: name,
            salary: salary,
            age: age,
        }]));
        return;
    }

    var employees: EmployeeStorage[] = JSON.parse(employeesJson);
    employees.push({
        id: employees[employees.length - 1].id + 1,
        name: name,
        salary: salary,
        age: age,
    });
    localStorage.setItem('employees', JSON.stringify(employees));
    
};

const getAllItems = (): EmployeeStorage[] => {
    var employeesJson = localStorage.getItem('employees');
    if (employeesJson == null) {
        return [];
    }
    var employees: EmployeeStorage[] = JSON.parse(employeesJson);
    return employees;
};

const updateItem = (id: number, name: string, salary: number, age: number): void => {
    var employeesJson = localStorage.getItem('employees');
    if (employeesJson == null) {
        throw new StorageError(`Failed to update employee ${id}!`);
    }

    var employees: EmployeeStorage[] = JSON.parse(employeesJson);
    employees.forEach(x => {
        if (x.id === id) {
            x.name = name;
            x.salary = salary;
            x.age = age;
            return;
        }
    });
    localStorage.setItem('employees', JSON.stringify(employees));
};

const deleteItem = (id: number): void => {
    var employeesJson = localStorage.getItem('employees');
    if (employeesJson == null) {
        throw new StorageError(`Failed to delete employee ${id}!`);
    }

    let employeeIndex = null;
    var employees: EmployeeStorage[] = JSON.parse(employeesJson);
    employees.forEach((x, i) => {
        if (x.id === id) {
            employeeIndex = i;
            return;
        }
    });

    if (employeeIndex == null) {
        throw new StorageError(`Failed to delete employee ${id}!`);
    }
    employees.splice(employeeIndex, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
};

export {
    saveItem,
    getAllItems,
    updateItem,
    deleteItem,
};