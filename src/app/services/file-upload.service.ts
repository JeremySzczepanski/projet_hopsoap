import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = `${environment.api+'image'+'?API_KEY='+environment.api_key}`;



  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any>{
    let formData: any = new FormData();
    formData.append("image", file);

    return this.http.post(this.baseUrl, formData, {
    reportProgress: true,
    observe: 'events'
    })
  }

  deleteImage(name: string): Observable<any>{
    const url: string = this.baseUrl+"&name="+name;

    return this.http.delete(url);
  }

  // editProduct(product: Product): Observable<Response>{
  //   const url = this.baseUrlUpdate+this.constructURLParams(product);

  //   return this.http.get<Response>(url);
  // }

  // constructURLParams = (object: any) => {
  //   let result = '';
  //   for (const property in object) {
  //     result += `&${property}=${object[property]}`;
  //   }
  //   return result;
  // }

}
