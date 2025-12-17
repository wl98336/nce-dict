import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DictService {
  nceIndex: string[] = [];
  constructor(private httpClient: HttpClient) {}

  getNceIndex(): Observable<string[]> {
    if (this.nceIndex.length) {
      return of(this.nceIndex);
    } else {
      return this.httpClient.get(`assets/index.json`).pipe(
        map(data=>Array.from<string>(data as any)),
        tap(data=>{
          this.nceIndex = data;
        })
      );
    }
  }

  lookupNCE(word: string): Observable<Object> {
    console.log('lookupNCE');
    return this.httpClient.get(`${environment.apiUrl}/nce/lookup`, { params: { word: word } });
  }
  lookupDict(word: string): Observable<Object> {
    console.log('lookupDict');
    return this.httpClient.get(`${environment.apiUrl}/dict/lookup`, { params: { word: word } });
  }
  lookupOalecd9(word: string): Observable<Object> {
    console.log('lookupDict');
    return this.httpClient.get(`${environment.apiUrl}/dict/lookup`, { params: { word: word } });
  }
}
