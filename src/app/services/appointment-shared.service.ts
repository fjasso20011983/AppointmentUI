import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppointmentModel } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSharedService {
  private refreshAppointmentsSource = new Subject<void>();
  refreshAppointments$ = this.refreshAppointmentsSource.asObservable();

  private selectedAppointmentSource = new Subject<AppointmentModel>();
  selectedAppointment$ = this.selectedAppointmentSource.asObservable();

  triggerRefreshAppointments() {
    this.refreshAppointmentsSource.next();
  }

  selectAppointment(appointment: AppointmentModel) {
    this.selectedAppointmentSource.next(appointment);
  }
}
