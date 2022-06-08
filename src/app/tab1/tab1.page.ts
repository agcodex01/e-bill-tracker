import { Router } from '@angular/router';
import { PreviousBill } from './../models/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { APP_NAME, BillGroup } from '../models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  billsPerYear: BillGroup[];
  appName = APP_NAME;
  billForm: FormGroup;
  prevTotal;
  prevBill: PreviousBill = {
    index: null,
    year: null,
  };
  constructor(public fb: FormBuilder, private router: Router) {
    this.billsPerYear = JSON.parse(localStorage.getItem('bills')) || [];
    this.billForm = this.fb.group({
      prevReading: new FormControl(0),
      currentReading: new FormControl(0),
      kph: new FormControl(0),
    });
    if (this.billsPerYear.length > 0) {
      const currentYearBill = this.billsPerYear[this.billsPerYear.length - 1];
      const prevMonthBillIndex = currentYearBill.values.length - 1;
      const prevMonthBill = currentYearBill.values[prevMonthBillIndex];
      this.prevTotal = prevMonthBill.total;
      this.prevBill.index = prevMonthBillIndex;
      this.prevBill.year = currentYearBill.year;
      this.billForm.setValue({
        prevReading: prevMonthBill.currentReading,
        currentReading: 0,
        kph: prevMonthBill.kph,
      });
    }
  }

  get total() {
    return (
      (this.billForm.value.currentReading - this.billForm.value.prevReading) *
      this.billForm.value.kph
    );
  }
  get isValid() {
    return (
      this.billForm.value.kph > 0 &&
      this.billForm.value.currentReading > this.billForm.value.prevReading
    );
  }
  ngOnInit(): void {
    console.log('INT');
  }
  addBill() {
    const date = new Date();
    let bpyData = this.billsPerYear.find(
      (bpy) => bpy.year === date.getFullYear()
    );


    if (this.billsPerYear.length < 1 && !bpyData) {
      bpyData = {
        year: date.getFullYear(),
        values: [
          {
            ...this.billForm.value,
            createdAt: date,
            total: this.total,
          },
        ],
      };
      this.billsPerYear.push(bpyData);
    } else {
      bpyData.values.push({
        ...this.billForm.value,
        createdAt: date,
        total: this.total,
      });
    }
    console.log(this.billsPerYear);
    this.prevTotal = this.total;
    this.prevBill = {
      year: date.getFullYear(),
      index: bpyData.values.length - 1,
    };
    this.billForm.setValue({
      prevReading: this.billForm.value.currentReading,
      currentReading: 0,
      kph: this.billForm.value.kph,
    });

    localStorage.setItem('bills', JSON.stringify(this.billsPerYear));
  }

  showDetailPrevReading() {
    this.router.navigate(['tabs/tab3'], {
      queryParams: { ...this.prevBill },
    });
  }
}
