import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { HotelService } from '../hotel/hotel.service';
import { CustomCalendarEvent, Hotel } from '../interfaces/interfaces';


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



  hotelData!: Hotel[];

  colors = {
    red: '#ad2121',
    yellow: '#FDF1BA',
    green: '#5fa08a',
  }
  
  
  
  // ngOnInit(): void {
    //   this.hotelService.getHotels().subscribe((hotels: Hotel[]) => {
      //     hotels.forEach(hotel => {
        //       hotel.rooms.single.daily_prices.forEach(element => {
          //         this.events$.push({
            //           start: new Date(element.start),
            //           price: element.price,
            //           title: ''
            //         })
            //       })
            //     })
            //   })
            //   console.log(this.events$)
            // }
  
            
  events$!: Observable<CalendarEvent<{ hotel: Hotel }>[]>


  ngOnInit(): void {
    this.fetchEvents()
  }


  fetchEvents(): void{
    this.events$ = this.hotelService.getHotels().pipe(
      map((hotels: Hotel[]) => {
        const events: CustomCalendarEvent[] = [];
        hotels.forEach(hotel => {
          if (hotel.rooms.single) {
            hotel.rooms.single.daily_prices.forEach(element => {
              events.push({
                start: new Date(element.start),
                price: element.price,
                title: '',
                allDay: true,
              })
            })
          }
        })
        return events
      })
    )
    const subscription: Subscription = this.events$.subscribe(events => {
      this.events$ = of(events);
      console.log(events);
    })
    // .subscribe(events => {
    //   this.events$ = of(events)
    //   console.log(events)
    // })
  }


  
  















  

  
  // PROPERTIES
  modalData!: {
    action: string;
    event: CalendarEvent;
  }
  
  activeDayIsOpen: boolean = true
  
  viewDate: Date = new Date()
  
  view: CalendarView = CalendarView.Month
  
  CalendarView = CalendarView

  locale: string = 'en';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];


  // METHODS
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false
  }

}