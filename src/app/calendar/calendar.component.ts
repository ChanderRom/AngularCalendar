import { Component, ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { HotelService } from '../hotel/hotel.service';
import { CustomCalendarEvent, Hotel, Room } from '../interfaces/interfaces';


@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.css'],
  templateUrl: 'calendar.component.html',
})


export class CalendarComponent implements OnInit {

  constructor(
    private _cdr: ChangeDetectorRef,
    private hotelService: HotelService,
  ) {}


  colors = {
    red: '#ad2121',
    orange: '#c9a110',
    green: '#5fa08a',
  }

  hotelsData: Hotel[] = [];
  
  roomsData: Room[] = [];

  selectedHotel: Hotel | null = null;
  
  selectedRoom: Room | null = null;

  calendarEvents$!: Observable<CustomCalendarEvent[]>;

  totalRooms!: number;

  prediction!: number;


  ngOnInit(): void {
    this.initData();
  }


  fetchEvents(hotelId: string, roomId: string, totalRooms: number): void{
    this.hotelService.getHotel(hotelId)
      .pipe(
        map((hotel: Hotel) => {
          const events: CustomCalendarEvent[] = [];

          if (hotel && hotel.rooms && hotel.rooms.length) {
            hotel.rooms.find(r => r.id === roomId)?.daily_prices.forEach(element => {
              const prediction: number = this.hotelService.getPrediction(totalRooms);

              events.push({
                start: new Date(element.start),
                price: element.price,
                title: '',
                allDay: true,
                prediction: prediction
              })
            })
          }
          return events;
        })
      )
      .subscribe(events => {
        this.calendarEvents$ = of(events);
        this._cdr.detectChanges();
      });
  }


  initData(): void {
    this.hotelService.getHotels().subscribe((hotels: Hotel[]) => {
      this.hotelsData = hotels;
      this.selectedHotel = this.hotelsData[0];
      this.roomsData = this.selectedHotel.rooms;
      this.selectedRoom = this.selectedHotel.rooms[0];
      this.totalRooms = this.selectedRoom.total;
      this.fetchEvents(this.selectedHotel.id, this.selectedRoom.id, this.totalRooms);
    });
  }


  onHotelChange(hotel: Hotel): void {
    this.selectedHotel = hotel;
    this.roomsData = this.selectedHotel.rooms;
    this.selectedRoom = this.selectedHotel.rooms[0];
    this.totalRooms = this.selectedRoom.total;
    this.fetchEvents(this.selectedHotel.id, this.selectedRoom.id, this.totalRooms);
  }



  onRoomChange(room: Room): void {
    this.selectedRoom = room;
    this.totalRooms = this.selectedRoom.total;
    this.fetchEvents(this.selectedHotel!.id, this.selectedRoom.id, this.totalRooms);
  }



  getColor(prediction: number): string {
    if (prediction <= 33) {
      return this.colors.red;
    } else if (prediction <= 66) {
      return this.colors.orange;
    } else {
      return this.colors.green;
    }
  }













  

  
  // PROPERTIES
  modalData!: {
    action: string;
    event: CalendarEvent
  }
  
  activeDayIsOpen: boolean = true
  
  viewDate: Date = new Date()
  
  view: CalendarView = CalendarView.Month
  
  CalendarView = CalendarView

  locale: string = 'en'

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY]


  // METHODS
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false
  }

}