import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})

export class FilterPanelComponent {
  public impreciseDate: boolean = false;
  public newEntryData: { name: string, start: string, type: string } = { name: '', start: '0001-01-01T00:00', type: '' };
  private _entityType: string = this.newEntryData.type;

  constructor(private _apiService: ApiService) { };

  createEntry() {
    this._apiService.createEntry(this._entityType, this.newEntryData);
    console.log('Entry created!', this.newEntryData)
  }

  getLablesForStartDate(): string {
    switch (this.newEntryData.type) {
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

