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
    console.log(this._getDatePrecision())
    this._apiService.createEntry(this.newEntryData).subscribe({
      // next: (v) => console.log(v),
      error: (e) => console.error('Error creating entry', e),
      complete: () => console.log('Entry creation complete')
    });
    // console.log('Entry created!', this.newEntryData)
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

  private _getDatePrecision(): any {
    if (this.isYearImprecise && this.isMonthImprecise && this.isDayImprecise) {
      console.log('All components of the date are imprecise!');
      return -1;
    }
    if (this.isDayImprecise && this.isMonthImprecise && !this.isYearImprecise) {
      console.log('Only know the year!')
      return 0
    }
    if (this.isDayImprecise && !this.isMonthImprecise && !this.isYearImprecise) {
      console.log('Only know the month and the year!')
      return 1
    }
    if (!this.isDayImprecise && !this.isMonthImprecise && !this.isYearImprecise) {
      console.log('Know the day and the month and the year!')
      return 2
    }
  }

  // date precision:
  // 0 - year
  // 1 - month
  // 2 - day
  // 3 - hour (time?)


}

