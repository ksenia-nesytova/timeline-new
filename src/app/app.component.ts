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
      title: "That one time something happened",
      events: [
        {
          "id": 37,
          "name": "Julius Caesar",
          "description": 'some guy',
          "start_date": -65306304000,
          "end_date": -63549360000,
          "start_date_precision": null,
          "end_date_precision": null
        },
        {
          "id": 38,
          "name": "Julius Caesar Birth",
          "description": 'born',
          "start_date": -65306304000,
          "end_date": -63549360000,
          "start_date_precision": null,
          "end_date_precision": null
        },
        {
          "id": 39,
          "name": "Assassination of Julius Caesar",
          "description": null,
          "start_date": -63549360000,
          "end_date": -63549360000,
          "start_date_precision": null,
          "end_date_precision": null
        }
      ],
    };

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc()
      .domain([new Date(line.events[0].start_date), new Date(line.events[line.events.length - 1].end_date)])
      .range([marginLeft, width - marginRight])
      .nice();


    console.log(new Date(line.events[2].end_date))
    const xAxis = d3.axisBottom(x);
    xAxis.ticks(line.events.length);

    // Create the SVG container.
    const svg = d3.select("#timeline-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Add the x-axis.
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    // Return the SVG element.
    return svg.node();
  }


}
