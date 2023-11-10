import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
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
    private hotelService: HotelService
  ) {}


  colors = {
    red: '#ad2121',
    yellow: '#FDF1BA',
    green: '#5fa08a',
  }

  
  hotelData: Hotel[] = []
  
  events$!: Observable<CustomCalendarEvent[]>

  selectedHotel: string | null = null

  rooms: string[] = ["single", "double", "suite"]

  selectedRoom: string | null = null


  ngOnInit(): void {
    this.fetchEvents()
    this.fetchHotels()
  }

  fetchEvents(hotelId?: number): void{
    hotelId = hotelId !== undefined ? hotelId : 0

    this.events$ = this.hotelService.getHotel(hotelId).pipe(
      map((hotel: Hotel) => {
        const events: CustomCalendarEvent[] = []

        if (hotel && hotel.rooms.single) {
          hotel.rooms.single.daily_prices.forEach(element => {
            events.push({
              start: new Date(element.start),
              price: element.price,
              title: '',
              allDay: true,
            })
          })
        }
        return events
      })
    )
    const subscription: Subscription = this.events$.subscribe(events => {
      this.events$ = of(events)
    })
  }


  fetchHotels(): void {
    this.hotelService.getHotels().subscribe((hotels: Hotel[]) => {
      this.hotelData = hotels;
      console.log(this.hotelData);
    });
  }


  onHotelChange(hotel: Hotel): void {
    this.selectedHotel = hotel.name
    this.fetchEvents(hotel.id)
  }

  onRoomChange(room: string): void {
    this.selectedRoom = room
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