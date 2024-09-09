import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';
import { LineComponent } from '../line/line.component';
import { NgFor } from '@angular/common';


import * as d3 from 'd3';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: true,
  imports: [CdkDropList, NgFor, LineComponent, CdkDrag]
})
export class TimelineComponent {
  lines = [
    {
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
    },
    {
      title: "The Dark Ages",
      events: [
        {
          title: "The Plague",
          year: 2056,
        },
        {
          title: "Birthrate increases dramatically",
          year: 2061,
        },
        {
          title: "Vaccines are found to do absolutely nothing",
          year: 2072,
        },
      ],
    },
    {
      title: "War of the Worlds",
      events: [
        {
          title: "Alien Invasion",
          year: 1987,
        },
        {
          title: "Xenobiology is now a part of the elementary school curriculum",
          year: 1991,
        },
        {
          title: "An alien becomes the first First Lady in the U.S.",
          year: 2004,
        }
      ],
    },
  ];

  // lines = [
  //   {
  //     title: 'TESTING MY BACKEND',
  //     events: [{
  //       "id": 1,
  //       "name": "Столетняя война",
  //       "description": "",
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 2,
  //       "name": "Эдуард III",
  //       "description": "",
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 3,
  //       "name": "Черная смерть",
  //       "description": "",
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 4,
  //       "name": "Joseph Brodsky",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 5,
  //       "name": "Joseph Brodsky",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 2,
  //       "name": "Эдуард III",
  //       "description": "",
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 3,
  //       "name": "Черная смерть",
  //       "description": "",
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 4,
  //       "name": "Joseph Brodsky",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 5,
  //       "name": "Joseph Brodsky",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 6,
  //       "name": "Joseph Brodsky Birth",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 34,
  //       "name": "Ovidius Naso",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 35,
  //       "name": "Ovidius Naso",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 36,
  //       "name": "Ovidius Naso Birth",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 37,
  //       "name": "Julius Caesar",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 38,
  //       "name": "Julius Caesar Birth",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 39,
  //       "name": "Assassination of Julius Caesar",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 40,
  //       "name": "Knight Templars",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 41,
  //       "name": "The Secular Franciscan Order",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 42,
  //       "name": "The Secular Franciscan TEST",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 43,
  //       "name": "test",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 44,
  //       "name": "Octavian Augustus",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 45,
  //       "name": "Octavian Augustus Birth",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 46,
  //       "name": "test1234",
  //       "description": null,
  //       "start_date": "1212-12-12T00:12:00.000Z",
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 47,
  //       "name": "test1234 Birth",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 48,
  //       "name": "timelinedb",
  //       "description": null,
  //       "start_date": "-000011-12-12T00:00:00.000Z",
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     },
  //     {
  //       "id": 49,
  //       "name": "timelinedb Birth",
  //       "description": null,
  //       "start_date": null,
  //       "end_date": null,
  //       "start_date_precision": null,
  //       "end_date_precision": null
  //     }
  //     ]
  //   }
  // ];


  // lines = [1, 6, 7, 8]
  // entities: any;


  private timelineContainer: any;

  // constructor(private _apiService: ApiService) { };

  ngOnInit() {

    this.createTimelineContainer();

    this.lines.forEach(timeline => this.createTimeline(timeline));


    // this._apiService.getData().subscribe({
    //   next: (data) => {
    //     this.entities = data;

    //     //FOR TESTING
    //     this.lines = [{
    //       title: 'TESTING THE BACKEND',
    //       events: this.entities
    //     }];
    //     console.log(this.lines)

    //     console.log(data);
    //   },
    //   error: (error) =>
    //     console.error('Error fetching data', error),
    // });
  }

  // drop(line: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.lines, line.previousIndex, line.currentIndex);
  //   console.log(line);
  // }

  private createTimelineContainer() {
    this.timelineContainer = d3.select("#timeline-container")
      .append("svg")
      .attr("width", '100%')
      .attr("height", 'auto');
  }

  private createTimeline(timeline: any) {
    const timelineGroup = this.timelineContainer.append("g");

    // Create a title group for the timeline
    timelineGroup.append("g")
      .style("text-anchor", "middle")
      .append("text")
      .text(timeline.title)
      .attr("x", 0)
      .attr("y", 60)
      .style("color", 'red');

    timeline.events.forEach((event: any, index: number) => {
      let eventGroup = timelineGroup.append("g")
        .attr("class", "timeline-event")


      let rectGroup = eventGroup.append("rect")
        .attr("x", 10 + (index * 50 + 100))
        .attr("y", 0) // Space out events vertically
        .attr("width", 50) // Set width to keep all rectangles consistent
        .attr("height", 30)
        .style("fill", event.color || "#008000");

      // Add a text label for the event's title and date
      rectGroup.append("text")
        .attr("x", 50) // Position text to be next to rectangle
        .attr("y", 50)
        .text(event.title);

      rectGroup.append("text")
        .attr("x", 50) // Offset for 'Year X' label
        .attr("y", 50) // Positioning the year label above or below the 
        .text(event.year);

    })
  }

}



