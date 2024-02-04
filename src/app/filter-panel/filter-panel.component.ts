import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})

export class FilterPanelComponent {
  impreciseDate: boolean = false;

  newEntry: { title: string, start: string, type: string } = { title: '', start: '0001-01-01T00:00', type: '' };

  constructor(private _apiService: ApiService) { };

  createEntry() {
    this._apiService.createEntry();
    console.log('Entry created!', this.newEntry)
  }

  getLablesForStartDate(): string {
    switch (this.newEntry.type) {
      case 'actor':
        return 'Birth Date';
      case 'event':
        return 'Start Date';
      case 'item':
        return 'Creation Date';
      case 'institution':
        return 'Founding Date';
      default:
        return 'Start Date';
    }
  }
}

