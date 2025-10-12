import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
  id?: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  licensePlate: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  endpoint = 'http://localhost:8080/api/cars';

  constructor (private HttpClient: HttpClient) { }

  getCars() {
    return this.HttpClient.get(this.endpoint);
  }

   // GET /api/cars/:id
  getCar(id: number): Observable<Car> {
    return this.HttpClient.get<Car>(`${this.endpoint}/${id}`);
  }

  // POST /api/cars
  createCar(car: Car): Observable<Car> {
    return this.HttpClient.post<Car>(this.endpoint, car);
  }

  // PUT /api/cars/:id
  updateCar(id: number, car: Partial<Car>): Observable<any> {
    return this.HttpClient.put(`${this.endpoint}/${id}`, car);
  }

  // DELETE /api/cars/:id
  deleteCar(id: number): Observable<any> {
    return this.HttpClient.delete(`${this.endpoint}/${id}`);
  }

}
