import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerDataService {

  constructor() { }

  private data: any = null;

  // Set data
  setData(data: any): void {
    this.data = data;
  }

  // Get data
  getData(): any {
    const tempData = this.data;
    this.clearData(); // Clear data once retrieved
    return tempData;
  }

  // Clear data
  clearData(): void {
    this.data = null;
  }
}
