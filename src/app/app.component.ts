import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppointmentService } from '././services/appointment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'appointment-app';

  appointment: any;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
   //this.getAppointment(1);
  }
 /*  getAppointment(id: number): void {
    this.appointmentService.getAppointment(id).subscribe(data => {
      this.appointment = data;
      console.log(this.appointment);
    });
  } */
}
