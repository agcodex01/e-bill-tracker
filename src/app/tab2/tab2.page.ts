import { Router } from '@angular/router';
import { APP_NAME } from './../models/index';
import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Bill, BillGroup } from '../models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements AfterViewChecked {
  billsPerYear: BillGroup[] = [];
  appName = APP_NAME;
  constructor(private router: Router) {
    this.billsPerYear = JSON.parse(localStorage.getItem('bills'));
  }
  ngAfterViewChecked(): void {
    this.billsPerYear = JSON.parse(localStorage.getItem('bills'));

  }

  viewDetails(year: number, index: number) {
    this.router.navigate(['tabs/tab3'], {
      queryParams: {
        year,
        index,
      },
    });
  }
  deleteBill(year, index) {
    const bpyData = this.billsPerYear.find((bpy) => bpy.year === year);
    const indexBpy = this.billsPerYear.findIndex(bpy => bpy.year === year);
    bpyData.values.splice(index, 1);
    if (bpyData.values.length === 0) {
      this.billsPerYear.splice(indexBpy, 1);
    }
    localStorage.setItem('bills', JSON.stringify(this.billsPerYear));
  }
}
