import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { sp } from "sp-pnp-js";
// import { ServiceComponent } from "./service.component"



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calendarOptions: Options;
  displayEvent: any;
  fullCalendarData: Options[] = []; calObj: any; backgroundColor: string;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  ngOnInit() {
    sp.web.lists.getByTitle("Congress Calendar").items.select("ID,Title,EventDate,EndDate,Region").filter("AddToCongressHome eq 1").get().then((items: any[]) => {
      for (let j = 0; j < items.length; j++) {
        switch (items[j].Region) {
          case "US":
            this.backgroundColor = "red"
            break;
          case "EU":
            this.backgroundColor = "#203864"
            break;
          case "Japan":
            this.backgroundColor = "#BDD7EE"
            break;
          case "ROW":
            this.backgroundColor = "#A9D18E"
            break;
          default:
            break;
        }
        this.calObj = {
          id: items[j].ID,
          title: items[j].Title,
          start: items[j].EventDate,
          end: items[j].EndDate,
          backgroundColor: this.backgroundColor,
          borderColor: this.backgroundColor,
          description: items[j].Title + "<br/>" + (items[j].Location == null ? "" : items[j].Location + ", " + items[j].Region) + "<br/>"
        }
        this.fullCalendarData.push(this.calObj);
      }
      this.calendarOptions = {
        eventLimit: true,
        contentHeight: 500,
        editable: false,
        fixedWeekCount: false,
        displayEventTime: false,
        header: {
          left: 'prev,next',
          center: 'title',
          right: ''
        },
        eventMouseover: (event, jsEvent, view) => this.eventMouseOver(event),
        events: this.fullCalendarData
      }
    });
  }


  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {}
    }
    this.displayEvent = model;
    console.log(this.displayEvent);
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
    console.log(this.displayEvent);
  }

  eventMouseOver(model: any) {
    this.displayEvent = model.title;
    console.log(this.displayEvent);
    let tooltip = '<div class="tooltipevent" style="width:500px;height:200px;position:absolute;z-index:10001;">' + this.displayEvent + '</div>';
    let $tooltip = $(tooltip).appendTo('body');
    $(this).mouseover(function (e) {
      $(this).css('z-index', 10000);
      $tooltip.fadeIn(500);
      $tooltip.fadeTo(10, 1.9);
    }).mousemove(function (e) {
      $tooltip.css('top', e.pageY + 10);
      $tooltip.css('left', e.pageX + 20);
    });

  }
}
