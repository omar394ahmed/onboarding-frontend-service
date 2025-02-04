import { Component } from '@angular/core';
import { Department, Employee } from '../../models/Employee.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeStoreService } from '../../stores/employee.store.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
 


  employee: Employee =  {
    id: 0,
    name: '',
    title: '',
    department: '',
    createdDate: null,
    updatedDate: null
  };

  constructor(private employeeService: EmployeeService , private employeeStore : EmployeeStoreService) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted', form.value);
     if (form.valid) {
      this.employeeStore.saveEmployee(this.employee);
    } 
  }
}