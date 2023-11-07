export interface Room {
    daily_prices: { start: Date; price: number }[];
    total: number;
}
  
export interface Hotel {
    name: string;
    rooms: {
        single: Room;
        double: Room;
        suite: Room;
    }
}
  
export interface DatabaseResponse {
    hotels: Hotel[];
}