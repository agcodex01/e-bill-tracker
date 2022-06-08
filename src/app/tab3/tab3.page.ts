import { APP_NAME } from './../models/index';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill, BillGroup, PreviousBill } from '../models';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  appName = APP_NAME;
  bill: Bill = {
    createdAt: null,
    prevReading: null,
    currentReading: null,
    kph: null,
    total: 0,
  };
  billsPerYear: BillGroup[];
  constructor(private route: ActivatedRoute) {
    this.billsPerYear = JSON.parse(localStorage.getItem('bills')) || [];

    this.route.queryParams.subscribe((param) => {
      const currentYearBill = this.billsPerYear.find(
        // eslint-disable-next-line eqeqeq
        (bpy) => bpy.year == param.year
      );
      this.bill = currentYearBill.values[param.index];
    });
  }
}
