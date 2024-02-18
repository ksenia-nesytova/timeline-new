import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})

export class FilterPanelComponent {
  public isStartDateImprecise: boolean = false;
  public isStartDayImprecise: boolean = false;
  public isStartMonthImprecise: boolean = false;
  public isStartYearImprecise: boolean = false;

  public isEndDateImprecise: boolean = false;
  public isEndDayImprecise: boolean = false;
  public isEndMonthImprecise: boolean = false;
  public isEndYearImprecise: boolean = false;

  public entryExists: boolean = false;

  public newEntryData: { name: string, start_date: string, end_date: string, start_date_precision: number, end_date_precision: number, type: string } = { name: '', start_date: '0001-01-01T00:00', end_date: '', start_date_precision: 0, end_date_precision: 0, type: '' };
  private _entityType: string = this.newEntryData.type;

  constructor(private _apiService: ApiService) { };

  public createEntry() {
    this.newEntryData.start_date_precision = this._getDatePrecision(
      this.isStartYearImprecise,
      this.isStartMonthImprecise,
      this.isStartDayImprecise
    );

    this._apiService.createEntry(this.newEntryData).subscribe({
      // next: (v) => console.log(v),
      error: (e) => console.error('Error creating entry', e),
      complete: () => console.log('Entry creation complete')
    });

    this._apiService.entryExists$.subscribe((entryExists: boolean) => this.entryExists = entryExists)
  }


  public getLablesForStartDate(): string {
    switch (this.newEntryData.type) {
      case 'actor':
        return 'Birth Date';
      case 'event':
        return 'Start Date';
      case 'item':
        return 'Creation Date';
      case 'institution':
        return 'Establishment Date';
      default:
        return 'Start Date';
    }
  }

  public getLablesForEndDate(): string {
    switch (this.newEntryData.type) {
      case 'actor':
        return 'Death Date';
      case 'event':
        return 'Start Date';
      case 'item':
        return 'Destruction Date';
      case 'institution':
        return 'Disbandment Date';
      default:
        return 'Start Date';
    }
  }

  private _getDatePrecision(isYearImprecise: boolean, isMonthImprecise: boolean, isDayImprecise: boolean): any {
    if (isYearImprecise && isMonthImprecise && isDayImprecise) {
      console.log('All components of the date are imprecise!');
      return -1;
    }
    if (isDayImprecise && isMonthImprecise && !isYearImprecise) {
      console.log('Only know the year!')
      return 0;
    }
    if (isDayImprecise && !isMonthImprecise && !isYearImprecise) {
      console.log('Only know the month and the year!')
      return 1;
    }
    if (!isDayImprecise && !isMonthImprecise && !isYearImprecise) {
      console.log('Know the day and the month and the year!')
      return 2;
    }
  }

  // date precision:
  // 0 - year
  // 1 - month
  // 2 - day
  // 3 - hour (time?)


}

