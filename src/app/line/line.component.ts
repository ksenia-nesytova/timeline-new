import { Component, Input } from '@angular/core';
import { Event } from '../shared/models/event.interface';
import { EventComponent } from '../event/event.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
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
