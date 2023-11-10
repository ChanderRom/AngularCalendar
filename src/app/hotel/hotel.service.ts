import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `http://localhost:3000/hotels/`;

  constructor(private http: HttpClient) { }

  getHotel(hotelId: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}${hotelId}`);
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl)
  }
}
