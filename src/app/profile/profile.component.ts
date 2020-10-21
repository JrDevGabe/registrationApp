import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { StudentAPIService } from './../services/student-api.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../services/student';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 studentData: Student;
 studentID: string;
 studentInformation: Student[];
  constructor(private dbConfig: AngularFirestore, private route: ActivatedRoute, private api: StudentAPIService, private router: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => this.studentID = params.id);
    this.getByID(this.studentID);
   }
  updateStudent(student: Student): any{

  }
  getByID(id): void{
    this.api.getStudentByID(id).subscribe(data => {
      this.studentInformation = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Student;
      });
      console.log(this.studentInformation);
    });

  }

}
