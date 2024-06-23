import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PokeResponse, PokeItem } from './interfaces/poke-list';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  constructor(private http: HttpClient) { }

  getDataPokeResponse(url: string): Observable<PokeResponse> {
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map((item: any) => ({
            name: item.name,
            url: item.url,
            detail: null // Initialize the detail property as null
          }))
        };
      }),
      mergeMap((pokeResponse: PokeResponse) => {
        return forkJoin(
          pokeResponse.results.map((pokeItem: PokeItem) => {
            return this.http.get<any>(pokeItem.url).pipe(
              map((pokeDetail: any) => {
                pokeItem.detail = pokeDetail; // Assign the detailed information to the detail property
                return pokeItem;
              })
            );
          })
        ).pipe(
          map(() => pokeResponse)
        );
      })
    );
  }
}