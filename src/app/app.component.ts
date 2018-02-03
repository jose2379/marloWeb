import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  coursesObservable: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.coursesObservable = this.getCourses('/obras');
  }
  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
}