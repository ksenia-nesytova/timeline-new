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
    const margin = { top: 220, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;


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

    const findStartDateandEndDate = function (): Array<Date> {
      const startDateArray = line.events.map((event) => event.start_date);
      const endDateArray = line.events.map((event) => event.end_date);
      let datesArray = startDateArray.concat(endDateArray).sort().map(date => new Date(date));
      return datesArray;
    }


    //https://observablehq.com/@d3/d3-extent

    const sortedDatesArr = findStartDateandEndDate();

    // Declare the x scale
    const x = d3.scaleTime()
      .domain(d3.extent(sortedDatesArr) as [Date, Date])
      .range([0, width])
      .nice();

    // Create the SVG container.
    const svg = d3.select("#timeline-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // Add x axis
    const xAxis = d3.axisBottom(x)
      .ticks(d3.timeYear.every(2))
    // .tickFormat(d3.timeFormat("%Y"));


    // Add the x axis group
    svg.append("g")
      .attr("class", "x-axis-group")
      .call(xAxis);


    const eventsG = svg.selectAll(".event") //"event" class is auto assigned
      .data(line.events)
      .enter()
      .append("g")
      .attr("class", "event");

    eventsG.append("text")
      .attr("x", (event) => x(event.start_date)) //determine coords of the label based on date
      .attr("y", -45)
      .text((d) => d.name);

    //add vertical line between event and date
    // eventsG.append("line")
    //   .attr("x1", (event) => x(event.start_date))
    //   .attr("y1", -15)
    //   .attr("x2", (event) => x(event.start_date))
    //   .attr("y2", height);

    // add box for an interval
    eventsG.append("rect")
      .attr("x", (event) => x(event.start_date))
      .attr("y", -10)
      .attr("width", (event) => Math.abs(x(event.end_date) -
        x(event.start_date)))
      .attr("height", 10)
      .attr("class", "interval-rect");

    // Return the SVG element.
    // return svg.node();
  }


}
