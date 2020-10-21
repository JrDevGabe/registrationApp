import { StudentAPIService } from './../services/student-api.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../services/student';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public students: StudentAPIService) { }
  studentData = new Student();
  studentInformation: Student[];
  message: string;

  // Add Student Information
  createStudent(): void{
    this.students.create(this.studentData).then( reset => {
      this.message = 'Student was succesfully added';
    });

  }
adduserInfo(item): any{
sessionStorage.setItem('StudentName', item.studentName);
sessionStorage.setItem('StudentSurname', item.studentSurname);
sessionStorage.setItem('StudentAddress', item.studentAddress);
sessionStorage.setItem('StudentPhone', item.studentPhone);
sessionStorage.setItem('StudentCourse', item.studentCourse);

}
  // Edit student information
  editStudentInfo(): any{

  }

  ngOnInit(): void {
    this.students.getStudent().subscribe(
      (info) => {
        this.studentInformation = info.map( e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Student;
        });
    });
    this.message = '';
  }

}
