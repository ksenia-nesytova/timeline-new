import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	public entryExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) { }

	getData(): Observable<any> {
		return this.http.get(
			'http://localhost:3000/');
	}

	createEntry(entryData?: any): Observable<Object> {

		let dataForApi = this._transformDataForApi(entryData);

		return this.http.get<boolean>(
			'http://localhost:3000/check-if-exists', { params: { name: dataForApi.name } }
		).pipe(
			switchMap((exists: boolean) => {
				if (exists) {
					console.log('EXISTS');
					this.entryExists$.next(true);
					throw new Error("Duplicate entry found!");
				}
				this.entryExists$.next(false);
				return this.http.post('http://localhost:3000/create-entry', dataForApi);
			})
		);
	}


	private _transformDataForApi(entryData: any) {
		return this._transformDataForEntitiesTable(entryData)
		// console.log(entryData, 'entryData')
		// console.log('Data transformed!')
	}

	private _transformDataForEntitiesTable(entryData: any) {
		let entryDataForEntities = entryData;
		console.log(entryData)
		delete entryDataForEntities.type;
		delete entryDataForEntities.date_precision;

		return entryDataForEntities;
	}
	// date precision:
	// 0 - year
	// 1 - month
	// 2 - day
	// 3 - hour (time?)


}
