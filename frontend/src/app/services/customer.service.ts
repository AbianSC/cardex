import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private base = 'http://localhost:8080/api/customers'; // usa proxy si lo tienes

  constructor(private http: HttpClient) {}

  getAll() { return this.http.get(this.base); }
  getOne(id:number) { return this.http.get(`${this.base}/${id}`); }
  create(body:any) { return this.http.post(this.base, body); }
  update(id:number, body:any) { return this.http.put(`${this.base}/${id}`, body); }
  delete(id:number) { return this.http.delete(`${this.base}/${id}`); }
}

