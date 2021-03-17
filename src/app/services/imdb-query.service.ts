import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Languages } from '../interfaces/languages';

@Injectable({
  providedIn: 'root'
})
export class ImdbQueryService {

  constructor(private http: HttpClient) { }

  async queryRandomAPI(): Promise<Languages[]> {

    /*
    const speakerCount: Languages[] = await new Promise<Languages[]>((resolve, _) => {
      this.http.get('http://localhost:1337/v1/languages', {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*'
        })
      }).subscribe((r) => resolve(r as Languages[]));
    });
*/
    return [];
  }
}
