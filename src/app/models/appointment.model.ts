export class AppointmentModel {
    constructor(
      public appointmentId: number,
      public title?: string,
      public appointmentDate: string="",
      //public appointmentDate: Date= new Date(),
      public time?: string,
      public description?: string,
      public userid?: number,
      public appointmentStatusId: number=0,
      public appointmentStatusName?: string,
    ) {}
  }