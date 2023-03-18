import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

  
  formValues!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
employeeData !:any;

showAdd !:boolean;
showUpdate !:boolean;

  constructor(private _fb: FormBuilder, private _api: ApiService) {}

  ngOnInit() {
    this.formValues = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }

clickAddEmployee(){
this.showAdd=true;
this.showUpdate=false;
  this.formValues.reset();
}

  postEmpolyeeDetails(){
    this.employeeModelObj.firstName=this.formValues.value.firstName;
    this.employeeModelObj.lastName=this.formValues.value.lastName;
    this.employeeModelObj.email=this.formValues.value.email;
    this.employeeModelObj.mobile=this.formValues.value.mobile;
    this.employeeModelObj.salary=this.formValues.value.salary;


    this._api.postEmployee(this.employeeModelObj)
    .subscribe((res)=>{
      // debugger;
      alert("Employee added successful")
      // console.log(res)
      this.formValues.reset();
      let ref= document.getElementById("cancel");
      ref?.click();
      this.getAllEmployee();
    }, err=>{
      alert("something went wrong")
    })

  }

  getAllEmployee(){
    this._api.getEmployee()
    .subscribe((res)=>{
this.employeeData=res;
    })
  }

  dltEmployee(empid:any){
this._api.deleteEmployee(empid.id)
.subscribe(res=>{
  alert("Employee deleted")
  this.getAllEmployee();
})
  }

  onEdit(emp:any){

    this.showAdd=false;
this.showUpdate=true;
    this.employeeModelObj.id=emp.id;
    this.formValues.controls['firstName'].setValue(emp.firstName);
    this.formValues.controls['lastName'].setValue(emp.lastName);
    this.formValues.controls['email'].setValue(emp.email);
    this.formValues.controls['mobile'].setValue(emp.mobile);
    this.formValues.controls['salary'].setValue(emp.salary);
  }

  updateEmpolyeeDetails(){
    this.employeeModelObj.firstName=this.formValues.value.firstName;
    this.employeeModelObj.lastName=this.formValues.value.lastName;
    this.employeeModelObj.email=this.formValues.value.email;
    this.employeeModelObj.mobile=this.formValues.value.mobile;
    this.employeeModelObj.salary=this.formValues.value.salary;

    this._api.updateEmployee(this.employeeModelObj , this.employeeModelObj.id)
    .subscribe(res=>{
      alert("update Successfully")
      let ref= document.getElementById("cancel");
      ref?.click();
      this.getAllEmployee();
    })

  }
}
