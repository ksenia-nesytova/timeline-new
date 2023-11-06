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
  message: any;
  constructor(private apiService: ApiService) { };
  ngOnInit() {
      this.apiService.getMessage().subscribe(data => {
          this.message = data;
          console.log(data);
      });
  }
}
