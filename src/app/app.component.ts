import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword
// } from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'timeline';
  entities: any;

  constructor() { };

  ngOnInit() { }
}
