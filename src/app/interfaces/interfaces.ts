import { CalendarEvent } from 'angular-calendar';

export interface Room {
    daily_prices: { start: Date; price: number }[];
    total: number;
}
  
export interface Hotel {
    id: number,
    name: string;
    rooms: {
        single: Room;
        double: Room;
        suite: Room;
    }
}

export interface CustomCalendarEvent extends CalendarEvent {
    start: Date;
    price: number;
}