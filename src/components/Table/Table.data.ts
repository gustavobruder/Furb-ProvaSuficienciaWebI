export interface TableData {
    id: number;
    employeeName: string;
    employeeSalary: number;
    employeeAge: number;
}

const createData = (
    id: number,  
    name: string,
    salary: number,
    age: number,
): TableData => {
    return {
        id: id,
        employeeName: name,
        employeeSalary: salary,
        employeeAge: age,
    };
}

const tableRowsMock = [
    createData(1, 'Tiger Nixon', 3.7, 67),
    createData(2, 'Garrett Winters', 25.0, 51),
    createData(3, 'Ashton Cox', 16.0, 24),
    createData(4, 'Cedric Kelly', 6.0, 24),
    createData(5, 'Airi Satou', 16.0, 49),
    createData(6, 'Brielle Williamson', 3.2, 87),
    createData(7, 'Herrod Chandler', 9.0, 37),
    createData(8, 'Rhona Davidson', 0.0, 94),
    createData(9, 'Colleen Hurst', 26.0, 65),
    createData(10,'Sonya Frost', 0.2, 98),
    createData(11,'Jena Gaines', 0, 81),
    createData(12,'Quinn Flynn', 19.0, 9),
    createData(13,'Charde Marshall', 18.0, 63),
];

export interface TableHeadCell {
    id: keyof TableData;
    label: string;
}

const tableHeadCells: readonly TableHeadCell[] = [
    {
        id: 'id',
        label: 'Employee Id',
    },
    {
        id: 'employeeName',
        label: 'Employee Name',
    },
    {
        id: 'employeeSalary',
        label: 'Employee Salary',
    },
    {
        id: 'employeeAge',
        label: 'Employee Age',
    },
];

export { tableRowsMock, tableHeadCells as headCells };