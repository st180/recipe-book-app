import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = "http://localhost:3000/api/recipes";
  baseUrl2 = "http://localhost:3000/api/recipes/update";

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.baseUrl);
  }

  create(data) {
    return this.http.post(this.baseUrl, data);
  }

  update(data) {
    return this.http.post(this.baseUrl2, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}