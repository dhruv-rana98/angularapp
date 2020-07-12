import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
// import { LEADERS } from '../shared/leaders';
import { resolve } from 'url';
import { Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class LeaderService {
	constructor(private http: HttpClient) {}

	getLeaders(): Observable<Leader[]> {
		return this.http.get<Leader[]>(baseURL + 'leadership');
	}

	getLeader(id: number): Observable<Leader> {
		return this.http.get<Leader>(baseURL + 'leadership/' + id);
	}

	getFeaturedLeader(): Observable<Leader> {
		return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map((leaders) => leaders[0]));
	}

	getLeaderIds(): Observable<number[] | any> {
		return this.getLeaders().pipe(map((leadership) => leadership.map((lead) => lead.id)));
	}
}
