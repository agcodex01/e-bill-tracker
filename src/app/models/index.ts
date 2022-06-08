export interface Bill {
  createdAt: Date;
  prevReading: number;
  currentReading: number;
  total: number;
  kph: number;
}

export interface BillGroup {
  year: number;
  values: Bill[];
}

export interface PreviousBill {
  year: number;
  index: number;
}

export const APP_NAME = 'E-Bill Tracker';
