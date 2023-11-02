import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';


@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.css'],
  templateUrl: 'calendar.component.html',
})


export class CalendarComponent implements OnInit {

  constructor(
    private modal: NgbModal,
  ) {}


  colors = {
    red: '#ad2121',
    yellow: '#FDF1BA',
    green: '#5fa08a',
  }

  price!: number
  
  
  @ViewChildren('price') priceElements!: QueryList<ElementRef>
  

  generateRandomPrice(): number {
    return this.price = Math.floor(Math.random() * (1200 - 30 + 1)) + 30
  }

  
  getPriceColor(price: number) {
    if (price < 200) {
      return {
        'background-color': '#ad2121'
      }
    } else if (price >= 200 && price < 500) {
      return {
        'background-color': '#FDF1BA'
      }
    } else if (price >= 500) {
      console.log(price)
      return {
        'background-color': '#5fa08a'
      }
    }
    return
  }
  
  // getPriceColor(price: number) {
  //   if (price < 200) {
  //     return {
  //       'background-color': this.colors['green']
  //     }
  //   } else if (price >= 200 && price < 500) {
  //     return {
  //       'background-color': this.colors['yellow']
  //     }
  //   } else if (price >= 500) {
  //     return {
  //       'background-color': this.colors['red']
  //     }
  //   }
  //   return
  // }
  
  ngAfterViewInit() {
    this.priceElements.forEach(element => {
      const value = parseInt(element.nativeElement.textContent)

      this.getPriceColor(value)
    })
  }
  
  ngOnInit() {
    this.generateRandomPrice()
  }
  
  












  
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>
  
  // PROPERTIES
  modalData!: {
    action: string;
    event: CalendarEvent;
  }
  
  activeDayIsOpen: boolean = true
  
  //DECLARATIONS
  viewDate: Date = new Date()
  
  view: CalendarView = CalendarView.Month
  
  CalendarView = CalendarView

  refresh = new Subject<void>()


  // METHODS
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false
  }


  // setView(view: CalendarView) {
  //   this.view = view
  // }




  // eventClicked({ event }: { event: CalendarEvent }): void {
  //   console.log('Event clicked', event);
  // }


  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors['red'],
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ]
  // }


  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete)
  // }


  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false
  //     } else {
  //       this.activeDayIsOpen = true
  //     }
  //     this.viewDate = date
  //   }
  // }


  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       }
  //     }
  //     return iEvent
  //   })
  // }


  // handleEvent(action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action }
  //   this.modal.open(this.modalContent, { size: 'lg' })
  // }


  
  // ACTIONS
  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="bi bi-pencil-fill i-button"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event)
  //     },
  //   },
  //   {
  //     label: '<i class="bi bi-trash3-fill i-button"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent(`Event: ${event.title}, deleted`, event)
  //       this.events = this.events.filter((iEvent) => iEvent !== event)
  //       this.deleteEvent(event)
  //     },
  //   },
  // ]


  // MOCK UP EVENTS
//   events: CalendarEvent[] = [
//     {
//       start: subDays(startOfDay(new Date()), 1),
//       end: addDays(new Date(), 1),
//       title: 'A 3 day event',
//       color: { ...colors['red'] },
//       actions: this.actions,
//       allDay: true,
//       resizable: {
//         beforeStart: true,
//         afterEnd: true,
//       },
//       draggable: true,
//     },
//     {
//       start: startOfDay(new Date()),
//       title: 'An event with no end date',
//       color: { ...colors['yellow'] },
//       actions: this.actions,
//     },
//     {
//       start: subDays(endOfMonth(new Date()), 3),
//       end: addDays(endOfMonth(new Date()), 3),
//       title: 'A long event that spans 2 months',
//       color: { ...colors['blue'] },
//       allDay: true,
//     },
//     {
//       start: addHours(startOfDay(new Date()), 2),
//       end: addHours(new Date(), 2),
//       title: 'A draggable and resizable event',
//       color: { ...colors['yellow'] },
//       actions: this.actions,
//       resizable: {
//         beforeStart: true,
//         afterEnd: true,
//       },
//       draggable: true,
//     },
//   ]
}
