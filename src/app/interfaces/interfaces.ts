import { CalendarEvent } from 'angular-calendar';

export interface Room {
    id: string;
    name: string;
    daily_prices: { start: Date; price: number }[];
    total: number;
}
  
export interface Hotel {
    id: string;
    name: string;
    rooms: Room[];
}

export interface CustomCalendarEvent extends CalendarEvent {
    start: Date;
    price: number;
    prediction: number;
}