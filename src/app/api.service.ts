import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
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
					console.log('EXISTS')
					throw new Error("Duplicate entry found!");
				}
				return this.http.post('http://localhost:3000/create-entry', dataForApi);
			})
		);
	}


	private _transformDataForApi(entryData: any) {
		console.log(entryData, 'entryData')
		console.log('Data transformed!')
	}


	// date precision:
	// 0 - year
	// 1 - month
	// 2 - day
	// 3 - hour (time?)


}
