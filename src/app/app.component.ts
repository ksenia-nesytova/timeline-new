import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import * as d3 from 'd3';

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

  ngOnInit() {
      // Declare the chart dimensions and margins.
      const width = 640;
      const height = 400;
      // const marginTop = 20;
      const marginRight = 20;
      const marginBottom = 30;
      const marginLeft = 70;

//https://d3js.org/d3-axis

      const line = {
        title: "The Revolution Era",
        events: [
          {
            title: "Revolution",
            year: 1917,
          },
          {
            title: "The clergy is radicalized",
            year: 1919,
          },
          {
            title: "Mummification of the Glorious Leader",
            year: 1937,
          },
        ],
      };
    
      // Declare the x (horizontal position) scale.
      const x = d3.scaleUtc()
          .domain([new Date(line.events[0].year), new Date(line.events[line.events.length - 1].year)])
          .range([marginLeft, width - marginRight]);
    
      // Create the SVG container.
      const svg = d3.select("#timeline-container")
      .append("svg")
          .attr("width", width)
          .attr("height", height);

      // Add the x-axis.
      svg.append("g")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(d3.axisBottom(x));

      // Return the SVG element.
      return svg.node();
    }

  
}
