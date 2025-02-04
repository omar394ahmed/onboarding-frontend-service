export class Employee {
  id: number;
  name: string;
  title: string;
  department: string;
  createdDate: Date | null;
  updatedDate: Date | null;

  constructor(
    id: number,
    name: string,
    title: string,
    department: string,
    createdDate: Date | null = null,
    updatedDate: Date | null = null
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.department = department;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }

  // Optional: A method to create an Employee object from an API response
  static fromJson(json: any): Employee {
    return new Employee(
      json.id,
      json.name,
      json.title,
      json.department,
      json.createdDate ? new Date(json.createdDate) : null,
      json.updatedDate ? new Date(json.updatedDate) : null
    );
  }
}

  
  export interface Department {
    id: number;
    name: string;
  }
  