import { Component, Input } from '@angular/core';
import { Event } from '../shared/models/event.interface';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
    standalone: true,
    imports: [CdkDrag]
})
export class EventComponent {
  @Input() event: Event = {} as Event;
}
