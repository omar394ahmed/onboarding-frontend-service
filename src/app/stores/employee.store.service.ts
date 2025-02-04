import { Inject, Injectable } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { finalize, firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { Employee } from '../models/Employee.model';
import { EmployeeService } from '../services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {


  initialState: EmployeeState = {
    employeeData: [],
    loading: false
  }

  employeeState = signalState<EmployeeState>(this.initialState);

  readonly employeeList = this.employeeState.employeeData;
  readonly loading = this.employeeState.loading;
 
  constructor(private employeeService: EmployeeService) {}


  readonly loadEmployeeList = rxMethod<void>(
    pipe(
      tap(() => this.setStateLoading()),
      switchMap(() => this.employeeService.getAllEmployees()
        .pipe(
          tapResponse({
            next: (response) => {
              if (response && response.data) {
                const employees = response.data.map((item :any) =>
                  Employee.fromJson(item)
                );
                patchState(this.employeeState, { employeeData: employees });
                console.log('Employee State after patch:', this.employeeList());
              } else {
                console.error('Invalid response format:', response);
              }
            },
            error: (error) => console.error('Error:', error),
          }),
          finalize(() => this.setStateNotLoading())
        )
      )
    )
  );
  
  

  async saveEmployee(newEmployee: Employee) {
    this.setStateLoading();
    await firstValueFrom (this.employeeService.addEmployee(newEmployee));
    this.loadEmployeeList(undefined); // Reload after saving
  }

  async updateEmployee(newEmployee: Employee) {
    this.setStateLoading();
    await this.employeeService.updateEmployee(newEmployee);
    this.loadEmployeeList(undefined); // Reload after saving
  }

  loadEmployees() {
    this.loadEmployeeList(undefined);
  }

  private setStateLoading() {
    patchState(this.employeeState, { loading: true });
  }

  private setStateNotLoading() {
    patchState(this.employeeState, { loading: false });
  }
}

interface EmployeeState {
  employeeData: Employee[],
  loading: boolean;
}
