import { Employee } from './../classes/employee';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from '../classes/users';
import { CommonLinksService } from './common-links.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  redirectUrl: any;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient, private _linksService : CommonLinksService) { }

    public employeeLogin(userId: string, password: string ) {
      return this.httpClient.post<any>(this._linksService.baseUrl_employee + '/employeeLogin.php', { userId, password })
      .pipe(map(Employee => {
          this.setToken(Employee[0].emp_id);
          this.getLoggedInName.emit(true);
          return Employee;
      }));
    }

    public employeeRegistration(firstname: string, lastname: string,
                                contactno: number, email: string,
                                password: string, datetime: number, address: string ) {
      return this.httpClient.post<any>(this._linksService.baseUrl_employee + '/employeeRegister.php', { firstname, lastname, contactno, email, password, datetime, address })
      .pipe(map(Employee => {
      return Employee;
      }));
     }

    public getEmp(){
      return this.httpClient.get<Employee[]>(this._linksService.baseUrl_employee + '/getEmp.php');
    }

    deleteEmployee(id: any){
      return this.httpClient.post<Employee[]>(this._linksService.baseUrl_employee + '/deleteEmp.php?', { id } );
    }

    recentEmployee(){
      return this.httpClient.get<Employee[]>(this._linksService.baseUrl_employee + '/recentEmployee.php');
    }

    public activeEmployee(emp_id: string){
      return this.httpClient.post<Employee[]>(this._linksService.baseUrl_employee + '/activeEmpById.php', { emp_id });
    }

    public addAmount(emp_id:string, amount:string ){
      return this.httpClient.post<Employee[]>(this._linksService.baseUrl_employee + '/employeeAmount.php', { emp_id, amount })
      .pipe(map(emp => {
      return emp;
      }));
    }

    public minusAmount(emp_id:string, amount:string ){
      return this.httpClient.post<Employee[]>(this._linksService.baseUrl_employee + '/employeeMinusAmount.php', { emp_id, amount })
      .pipe(map(emp => {
      return emp;
      }));
    }

    public forgotPassword(email: string, emp_id: string){
      return this.httpClient.post<Employee[]>(this._linksService.baseUrl_employee + '/forgotPasswordEmp.php',{ email, emp_id })
        .pipe(map(employee => {
            return employee;
         }));
    }

    public resetPassword(password: string, emp_id: string){
      return this.httpClient.post<Employee[]>(this._linksService.baseUrl_employee + '/resetPasswordEmp.php',{ password, emp_id })
      .pipe(map(partner => {
          return partner;
       }));
    }

  //token
    setToken(token: string) {
    localStorage.setItem('token', token);
    }
    getToken() {
    return localStorage.getItem('token');
    }
    deleteToken() {
    localStorage.removeItem('token');
    }
    isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true
    }
    return false;
    }
}



