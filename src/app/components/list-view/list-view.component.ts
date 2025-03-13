//import { NgFor } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { NgFor, NgIf } from '@angular/common';
import { AppointmentModel } from '../../models/appointment.model';
import { AppointmentSharedService } from '../../services/appointment-shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-view',
  imports: [NgFor,CommonModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent implements OnInit {
  @Input() roleName: string = '';

  appointment?: AppointmentModel[];
 constructor(private appointmentService: AppointmentService,
    private appointmentSharedService: AppointmentSharedService
  ) { }

  ngOnInit(): void {
   this.getAppointment(this.roleName);
   this.appointmentSharedService.refreshAppointments$.subscribe(() => {
    this.getAppointment(this.roleName);
  });
  }
  getAppointment(role: string): void {
    if(role=='manager'){this.appointmentService.getAppointmentAll().subscribe(data => {
      this.appointment = data;
    });}
    else{
      this.appointmentService.getAppointment(1).subscribe(data => {
        this.appointment = data;
      });
    }
    
  }
  
  updateItem(item: AppointmentModel): void {
    console.log(item.appointmentDate);
    const date = new Date(item.appointmentDate);
    
    const timeString = item.appointmentDate.split('T')[1]; // Obtener la parte de la hora
    item.time = timeString.substring(0, 5); // Obtener HH:mm
  
    item.appointmentDate = date.toISOString().split('T')[0];
    
    this.appointmentSharedService.selectAppointment(item);
  }

  updateItemM(id:number, item: AppointmentModel,type:number): void {
    console.log(item.appointmentDate);
    item.appointmentStatusId= type;
    const date = new Date(item.appointmentDate);
    const timeString = item.appointmentDate.split('T')[1];
    item.time = timeString.substring(0, 5); // Obtener HH:mm
    item.appointmentDate = date.toISOString().split('T')[0];
    this.appointmentService.updateAppointment(id,item).subscribe(
      response => {
        console.log('Appointment deleted successfully', response);
        alert('Appointment deleted successfully!');
        this.getAppointment(this.roleName);
      },
      error => {
        console.error('Error updating appointment', error);
        alert('Error updating appointment');
      }
    );

  }

deleteAppointment(id: number): void {
  console.log('borrando id');
  console.log(id);
  this.appointmentService.deleteAppointment(id).subscribe(
    response => {
      console.log('Appointment deleted successfully', response);
      alert('Appointment deleted successfully!');
      this.getAppointment(this.roleName);
    },
    error => {
      console.error('Error deleting appointment', error);
      alert('Error deleting appointment');
    }
  );
}
}
