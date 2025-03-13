import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentModel } from '../../models/appointment.model';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentSharedService } from '../../services/appointment-shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  @Input() roleName: string = '';
  applyForm = new FormGroup({
    appointmentId: new FormControl(0),
    title: new FormControl('', Validators.required),
    appointmentDate: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    appointmentStatusId: new FormControl(0),
    appointmentStatusName: new FormControl(''),
  });
  isUpdating: boolean = false;
  errorMessage: string = '';

  appointment: AppointmentModel = new AppointmentModel(0, '', '', '', '', 0, 0);
  appointmentStatusOptions = [
    { appointmentStatusId: 1, appointmentStatusName: 'New' },
    { appointmentStatusId: 2, appointmentStatusName: 'Approved' },
    { appointmentStatusId: 3, appointmentStatusName: 'Cancelled' }
  ];

  constructor(private appointmentService: AppointmentService,
    private appointmentSharedService: AppointmentSharedService
  ) {}

  ngOnInit(): void {
    this.appointmentSharedService.selectedAppointment$.subscribe(appointment => {
      this.appointment = appointment;
      this.isUpdating = true;
    });
  }

  resetForm(): void {
    this.applyForm.reset();
    this.isUpdating = false;
  }
  onSubmit(): void {
    if (this.isUpdating) {
      this.updateAppointment();
    } else {
      this.newAppointment();
    }

    // Reset form after submission
    this.applyForm.reset();
    this.isUpdating = false;
  }

  newAppointment(): void {
    this.appointment.appointmentId = this.applyForm.value.appointmentId ?? 0;
    this.appointment.title = this.applyForm.value.title ?? '';
    this.appointment.appointmentDate = `${this.applyForm.value.appointmentDate}T${this.applyForm.value.time}`;
    this.appointment.time = this.applyForm.value.time ?? '';
    this.appointment.description = this.applyForm.value.description ?? '';
    this.appointment.userid = 1;
    this.appointment.appointmentStatusId = 1;

    this.appointmentService.newAppointment(this.appointment).subscribe(
      response => {
        console.log('Appointment created successfully', response);
        alert('Appointment created successfully!');
        this.appointmentSharedService.triggerRefreshAppointments();
      },
      error => {
        console.error('Error creating appointment', error);
        this.errorMessage = error.error || 'Error creating appointment';
        alert(this.errorMessage);
        this.appointmentSharedService.triggerRefreshAppointments();
      }
    );
  }

  updateAppointment(): void {
    this.appointment.appointmentId = this.applyForm.value.appointmentId ?? 0;
    this.appointment.title = this.applyForm.value.title ?? '';
    this.appointment.appointmentDate = `${this.applyForm.value.appointmentDate}T${this.applyForm.value.time}`;
    this.appointment.time = this.applyForm.value.time ?? '';
    this.appointment.description = this.applyForm.value.description ?? '';
    this.appointment.userid = 1;
    this.appointment.appointmentStatusId = this.applyForm.value.appointmentStatusId ?? 1;

    if (!this.appointment.appointmentId) {
      alert('Appointment ID is required to update an appointment');
      return;
    }

    this.appointmentService.updateAppointment(Number(this.appointment.appointmentId), this.appointment).subscribe(
      response => {
        alert('Appointment updated successfully!');
        this.appointmentSharedService.triggerRefreshAppointments();
      },
      error => {
        console.error('Error updating appointment', error);
        this.errorMessage = error.error || 'Error updating appointment';
        alert(this.errorMessage);
        this.appointmentSharedService.triggerRefreshAppointments();
      }
    );
  }
}
