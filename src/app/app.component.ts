import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationRequest, ReservationService} from "./reservation.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-frontend';

  constructor(private reservationService: ReservationService) {
  }

  rooms: Room[] | undefined;
  roomSearchForm!: FormGroup;

  currentCheckinValue!: string;
  currentCheckoutValue!: string;
  currentRoomNumber!: number;
  currentPrice!: number;

  ngOnInit(): void {
    this.roomSearchForm = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl(''),
      roomNumber: new FormControl(''),
      price: new FormControl('')
    });

    //Every time that en element change
    this.roomSearchForm.valueChanges.subscribe(form => {
      this.currentCheckinValue = form.checkin;
      this.currentCheckoutValue = form.checkout;

      if (form.roomNumber) {
        let roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = Number(roomValues[0]);
        this.currentPrice = Number(roomValues[1]);
      }


    });

    this.rooms = [
      new Room("127", "127", "150"),
      new Room("138", "138", "130"),
      new Room("254", "254", "180")
    ]
  }

  createReservation() {
    this.reservationService.createReservation(
      new ReservationRequest(this.currentRoomNumber, this.currentCheckinValue, this.currentCheckoutValue, this.currentPrice)
    ).subscribe(result => console.log(result));
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
