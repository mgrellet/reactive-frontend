import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-frontend';

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = 'http://localhost:8080';
  private reservationUrl: string = this.baseUrl + '/room/v1/reservation/';
  rooms: Room[] | undefined;

  ngOnInit(): void {
    this.rooms = [
      new Room("127", "127", "150"),
      new Room("138", "138", "130"),
      new Room("254", "254", "180")
    ]
  }
}

export class Room {
  id: string;
  roomNumber: string;
  price: string;

  constructor(id: string, roomNumber: string, price: string) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;

  }
}
