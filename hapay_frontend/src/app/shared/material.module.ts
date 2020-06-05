import { NgModule } from "@angular/core";
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  DateAdapter
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

export const DateFormat = {
  parse: {
    dateInput: "MMMM DD, YYYY"
  },
  display: {
    dateInput: "MMMM DD, YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "MM-DD-YYYY",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useFactory: () => {
        return new MomentDateAdapter('en');
      },
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: DateFormat }
  ]
})
export class MaterialDateAdapterModule {}
