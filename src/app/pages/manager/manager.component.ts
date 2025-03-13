import { Component } from '@angular/core';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';

@Component({
  selector: 'app-manager',
  imports: [ListViewComponent, AppointmentFormComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
