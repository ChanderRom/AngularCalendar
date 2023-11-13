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
  
  // getHotels2(): Observable<Hotel[]> {
  //   return of(db.hotels)
  // }
  
  // getHotel2(hotelId: number): Observable<Hotel> {
  //   return of(db.hotels.find(h => h.id === hotelId)!)
  // }
}


// const db = {
//   hotels: [
//     {
//       id: 0,
//       name: "Hotel 1",
//       rooms: [
//         {
//         id: 0,
//         name: "single",
//         daily_prices: [
//             { start: "2023-11-01", price: 120 },
//             { start: "2023-11-02", price: 125 },
//             { start: "2023-11-03", price: 130 },
//             { start: "2023-11-04", price: 135 },
//             { start: "2023-11-05", price: 140 },
//             { start: "2023-11-06", price: 145 },
//             { start: "2023-11-07", price: 150 },
//             { start: "2023-11-08", price: 155 },
//             { start: "2023-11-09", price: 160 },
//             { start: "2023-11-10", price: 165 },
//             { start: "2023-11-11", price: 170 },
//             { start: "2023-11-12", price: 175 },
//             { start: "2023-11-13", price: 180 },
//             { start: "2023-11-14", price: 185 },
//             { start: "2023-11-15", price: 190 },
//             { start: "2023-11-16", price: 195 },
//             { start: "2023-11-17", price: 200 },
//             { start: "2023-11-18", price: 205 },
//             { start: "2023-11-19", price: 210 },
//             { start: "2023-11-20", price: 215 },
//             { start: "2023-11-21", price: 220 },
//             { start: "2023-11-22", price: 225 },
//             { start: "2023-11-23", price: 230 },
//             { start: "2023-11-24", price: 235 },
//             { start: "2023-11-25", price: 240 },
//             { start: "2023-11-26", price: 245 },
//             { start: "2023-11-27", price: 250 },
//             { start: "2023-11-28", price: 255 },
//             { start: "2023-11-29", price: 260 },
//             { start: "2023-11-30", price: 175 }
//           ],
//         total: 30
//         },
//         {
//         id: 1,
//         name: "double",
//         daily_prices: [
//             { start: "2023-11-01", price: 120 },
//             { start: "2023-11-02", price: 125 },
//             { start: "2023-11-03", price: 130 },
//             { start: "2023-11-04", price: 135 },
//             { start: "2023-11-05", price: 140 },
//             { start: "2023-11-06", price: 145 },
//             { start: "2023-11-07", price: 150 },
//             { start: "2023-11-08", price: 155 },
//             { start: "2023-11-09", price: 160 },
//             { start: "2023-11-10", price: 165 },
//             { start: "2023-11-11", price: 170 },
//             { start: "2023-11-12", price: 175 },
//             { start: "2023-11-13", price: 180 },
//             { start: "2023-11-14", price: 185 },
//             { start: "2023-11-15", price: 190 },
//             { start: "2023-11-16", price: 195 },
//             { start: "2023-11-17", price: 200 },
//             { start: "2023-11-18", price: 205 },
//             { start: "2023-11-19", price: 210 },
//             { start: "2023-11-20", price: 215 },
//             { start: "2023-11-21", price: 220 },
//             { start: "2023-11-22", price: 225 },
//             { start: "2023-11-23", price: 230 },
//             { start: "2023-11-24", price: 235 },
//             { start: "2023-11-25", price: 240 },
//             { start: "2023-11-26", price: 245 },
//             { start: "2023-11-27", price: 250 },
//             { start: "2023-11-28", price: 255 },
//             { start: "2023-11-29", price: 260 },
//             { start: "2023-11-30", price: 175 }
//           ],
//         total: 30
//         },
//       ]
//     },
//     {
//       "id": 1,
//       "name": "Hotel 2",
//       "rooms": [
//         {
//           id: 0,
//           name: "double",
//           daily_prices: [
//               { start: "2023-11-01", price: 120 },
//               { start: "2023-11-02", price: 125 },
//               { start: "2023-11-03", price: 130 },
//               { start: "2023-11-04", price: 135 },
//               { start: "2023-11-05", price: 140 },
//               { start: "2023-11-06", price: 145 },
//               { start: "2023-11-07", price: 150 },
//               { start: "2023-11-08", price: 155 },
//               { start: "2023-11-09", price: 160 },
//               { start: "2023-11-10", price: 165 },
//               { start: "2023-11-11", price: 170 },
//               { start: "2023-11-12", price: 175 },
//               { start: "2023-11-13", price: 180 },
//               { start: "2023-11-14", price: 185 },
//               { start: "2023-11-15", price: 190 },
//               { start: "2023-11-16", price: 195 },
//               { start: "2023-11-17", price: 200 },
//               { start: "2023-11-18", price: 205 },
//               { start: "2023-11-19", price: 210 },
//               { start: "2023-11-20", price: 215 },
//               { start: "2023-11-21", price: 220 },
//               { start: "2023-11-22", price: 225 },
//               { start: "2023-11-23", price: 230 },
//               { start: "2023-11-24", price: 235 },
//               { start: "2023-11-25", price: 240 },
//               { start: "2023-11-26", price: 245 },
//               { start: "2023-11-27", price: 250 },
//               { start: "2023-11-28", price: 255 },
//               { start: "2023-11-29", price: 260 },
//               { start: "2023-11-30", price: 175 }
//             ],
//           total: 30
//           },
//       ]
//     },
//   ]
// }