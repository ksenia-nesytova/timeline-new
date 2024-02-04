import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
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
    console.log('TIMELINE');
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

  drop(line: CdkDragDrop<string[]>) {
    moveItemInArray(this.lines, line.previousIndex, line.currentIndex);
    console.log(line);
  }

}
