import { Component } from '@angular/core';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';

@Component({
  selector: 'app-user',
  imports: [ListViewComponent, AppointmentFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
