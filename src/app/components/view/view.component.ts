import { ChangeDetectorRef, Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Employee } from '../../models/Employee.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EmployeeStoreService } from '../../stores/employee.store.service';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule  , TableModule  , ButtonModule  , FormsModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  
  public isEditing: boolean = false; 
 
employees : Signal<Employee[]> =  this.employeeStore.employeeList;
employeeCount: Signal<number> = computed(() => this.employees().length);
loading : Signal<boolean>  = this.employeeStore.loading;

constructor(public employeeStore: EmployeeStoreService) {
 this.employeeStore.loadEmployeeList();
}

update(employee: Employee) {
  this.employeeStore.updateEmployee(employee);
}
ngOnInit(): void {
 
}

ngOnDestroy(): void {}
}