import { Student } from './student';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class StudentAPIService {

  constructor(public dbConfig: AngularFirestore) { }
  create(studentInfo: Student): any{
    console.log('From Services Class');
    console.log(studentInfo);
    this.dbConfig.collection('studentInformation').add({...studentInfo});
  }

  getStudent(): any{
    return this.dbConfig.collection('studentInformation').snapshotChanges();
  }

  getStudentByID(id): any{
    return this.dbConfig.collection('studentInformation').doc(id).get();
  }

  update(student: Student): void {
   delete student.id;
   this.dbConfig.doc('studentInformation' + student.id).update(student);
  }
  delete(id: string): any{
    this.dbConfig.doc('studentInformation' + id).delete();
  }
}
