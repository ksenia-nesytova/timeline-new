import { Component } from '@angular/core';
import { Event } from '../shared/models/event.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})

export class LineComponent {

  events: Event[] = [
    {
      title: "Revolution",
      year: 1917,
    },
    {
      title: "Plague",
      year: 2056,
    },
    {
      title: "Alien Invasion",
      year: 1987,
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    console.log(event);
  }

}
