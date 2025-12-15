import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DictService {
  constructor(private httpClient: HttpClient) {}
  lookupNCE(word: string): Observable<Object> {
    console.log('lookupNCE');
    return this.httpClient.get(`${environment.apiUrl}/nce/lookup`, { params: { word: word }});
  }
  lookupDict(word: string): Observable<Object> {
    console.log('lookupDict');
    return this.httpClient.get(`${environment.apiUrl}/dict/lookup`, { params: { word: word }});
  }
  lookupOalecd9(word: string): Observable<Object> {
    console.log('lookupDict');
    return this.httpClient.get(`${environment.apiUrl}/dict/lookup`, { params: { word: word }});
  }
}
