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
    yellow: '#FDF1BA',
    green: '#5fa08a',
  }

  hotelsData: Hotel[] = []
  
  roomsData: Room[] = []

  selectedHotel: Hotel | null = null
  
  selectedRoom: Room | null = null

  calendarEvents$!: Observable<CustomCalendarEvent[]>


  ngOnInit(): void {
    this.initData();
  }


  fetchEvents(hotelId: string, roomId: string): void{
    this.calendarEvents$ = this.hotelService.getHotel(hotelId).pipe(
      map((hotel: Hotel) => {
        const events: CustomCalendarEvent[] = [];

        if (hotel && hotel.rooms && hotel.rooms.length) {
          hotel.rooms.find(r => r.id === roomId)?.daily_prices.forEach(element => {
            events.push({
              start: new Date(element.start),
              price: element.price,
              title: '',
              allDay: true,
            })
          })
        }
        return events;
      })
    )
    const subscription: Subscription = this.calendarEvents$.subscribe(events => {
      this.calendarEvents$ = of(events);
      this._cdr.detectChanges();
    })
  }


  initData(): void {
    this.hotelService.getHotels().subscribe((hotels: Hotel[]) => {
      this.hotelsData = hotels;
      this.selectedHotel = this.hotelsData[0];
      this.roomsData = this.selectedHotel.rooms;
      this.selectedRoom = this.selectedHotel.rooms[0];
      this.fetchEvents(this.selectedHotel.id, this.selectedRoom.id);
    });
  }


  onHotelChange(hotel: Hotel): void {
    this.selectedHotel = hotel;
    this.roomsData = this.selectedHotel.rooms;
    this.selectedRoom = this.selectedHotel.rooms[0];
    this.fetchEvents(this.selectedHotel.id, this.selectedRoom.id);
  }



  onRoomChange(room: Room): void {
    this.selectedRoom = room;
    this.fetchEvents(this.selectedHotel!.id, this.selectedRoom.id);
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