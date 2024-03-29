import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';
import { LineComponent } from '../line/line.component';
import { NgFor } from '@angular/common';

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

  entities: any;

  constructor(private _apiService: ApiService) { };

  ngOnInit() {
    this._apiService.getData().subscribe({
      next: (data) => {
        this.entities = data;
        console.log(data);
      },
      error: (error) =>
        console.error('Error fetching data', error),
    });
  }

  drop(line: CdkDragDrop<string[]>) {
    moveItemInArray(this.lines, line.previousIndex, line.currentIndex);
    console.log(line);
  }

}
