import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})

export class FilterPanelComponent {
  public isDateImprecise: boolean = false;
  public isYearImprecise: boolean = false;
  public isMonthImprecise: boolean = false;
  public isDayImprecise: boolean = false;


  public newEntryData: { name: string, start_date: string, end_date: string, date_precision: number, type: string } = { name: '', start_date: '0001-01-01T00:00', end_date: '', date_precision: 0, type: '' };
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

