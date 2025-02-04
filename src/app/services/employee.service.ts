import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/Employee.model';
import { AppConfigService } from '../config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: AppConfigService) {
    this.apiUrl = this.configService.getApiUrl();
  }

  addEmployee(employee: Employee): Observable<any> {
    console.log('Employee to add:', employee);
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    return this.http.post<any>(`${this.apiUrl}/employees`, employee , {headers})
      .pipe(
        catchError(error => {
          if (error.error && error.error.detailMessageArguments) {
            const detailMessageArguments = error.error.detailMessageArguments;
            // Show the values in an alert
            alert(`Error: ${detailMessageArguments.join(', ')}`);
          } else {
            alert('An unexpected error occurred');
          }
          return throwError(error);
        })
      );
  }
  updateEmployee(employee: Employee): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      console.log('Employee to update:', employee);
    return this.http.put<any>(`${this.apiUrl}/employees/${employee.id}`, employee, { headers })
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees`);
}
}
