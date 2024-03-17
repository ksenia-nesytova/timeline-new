import { Component, Input } from '@angular/core';
import { Event } from '../shared/models/event.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { EventComponent } from '../event/event.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss'],
    standalone: true,
    imports: [CdkDropList, NgFor, EventComponent]
})

export class LineComponent {
  @Input() line: any;

  events: Event[] = [];

  ngOnChanges() {
    if (this.line && this.line.events) {
      this.events = [...this.line.events];
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    console.log(event);
  }

}
