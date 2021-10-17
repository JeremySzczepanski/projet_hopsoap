import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = `${environment.api+'category'+'?API_KEY='+environment.api_key}`;

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl);
  }

}
