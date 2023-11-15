import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hotel } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `http://localhost:3000/hotels/`;

  constructor(private http: HttpClient) { }

  getHotel(hotelId: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}${hotelId}`);
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl)
  }

  getPrediction(totalRooms: number): number {
    const percentage: number = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    return percentage
  }
}