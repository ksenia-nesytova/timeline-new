import { Component, Input } from '@angular/core';
import { Event } from '../shared/models/event.interface';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() event: Event = {} as Event;
}
