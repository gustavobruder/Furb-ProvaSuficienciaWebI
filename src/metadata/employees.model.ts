import { FetchResult } from './fetch-result.model';

interface EmployeeDetail {
    id: number;
    employee_name: string;
    employee_salary: number;
    employee_age: number;
    profile_image: number;
}

export interface EmployeeDetailResponse extends FetchResult<EmployeeDetail> {
}

interface EmployeeList extends EmployeeDetail {
}

export interface EmployeeListResponse extends FetchResult<EmployeeList[]> {
}

interface EmployeeCreate {
    id: number;
    name: string;
    salary: number;
    age: number;
}

export interface EmployeeCreateResponse extends FetchResult<EmployeeCreate> {
}

interface EmployeeUpdate {
    name: string;
    salary: number;
    age: number;
}

export interface EmployeeUpdateResponse extends FetchResult<EmployeeUpdate> {
}

export interface EmployeeDeleteResponse extends FetchResult<string> {
}