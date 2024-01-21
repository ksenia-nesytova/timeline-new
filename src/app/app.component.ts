import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword
// } from "@angular/fire/auth";

// import { LineComponent } from './line/line.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'timeline';
  entities: any;

  constructor(private _apiService: ApiService) { };

  ngOnInit() {
    this._apiService.getData().subscribe(
      (data: any) => {
        this.entities = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
