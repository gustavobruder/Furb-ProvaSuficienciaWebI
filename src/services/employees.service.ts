import {
    EmployeeListResponse,
    EmployeeDetailResponse,
    EmployeeCreateResponse,
    EmployeeUpdateResponse,
    EmployeeDeleteResponse
} from "../metadata/employees.model";

const baseUrl = 'http://dummy.restapiexample.com/api/v1';

const getEmployeeList = async () => {
    const response = await fetch(`${baseUrl}/employees`);
    const json = await response.json();
    const employeeList = json as EmployeeListResponse;
    console.log('EmployeeList -> ', employeeList);
};

const getEmployeeDetail = async (id: number) => {
    const response = await fetch(`${baseUrl}/employee/${id}`);
    const json = await response.json();
    const employeeDetail = json as EmployeeDetailResponse;
    console.log('EmployeeDetail -> ', employeeDetail);
};

const createEmployee = async (name: string, salary: number, age: number) => {
    const payload = {
        name: name,
        salary: salary,
        age: age,
    };
    const response = await fetch(`${baseUrl}/create`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    const json = await response.json();
    const employeeCreation = json as EmployeeCreateResponse;
    console.log('EmployeeCreation -> ', employeeCreation);
};

const updateEmployee = async (id: number, name: string, salary: number, age: number) => {
    const payload = {
        name: name,
        salary: salary,
        age: age,
    };
    const response = await fetch(`${baseUrl}/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
    const json = await response.json();
    const employeeUpdate = json as EmployeeUpdateResponse;
    console.log('EmployeeUpdate -> ', employeeUpdate);
};

const deleteEmployee = async (id: number) => {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
        method: 'DELETE',
    });
    const json = await response.json();
    const employeeDeletion = json as EmployeeDeleteResponse;
    console.log('EmployeeDeletion -> ', employeeDeletion);
};

export {
    getEmployeeList,
    getEmployeeDetail,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
