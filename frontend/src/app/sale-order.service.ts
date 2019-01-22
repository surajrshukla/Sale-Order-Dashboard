import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {

  uri = 'http://localhost:4000/sale_orders';
  constructor(private http: HttpClient) { }

  getSaleOrders() {
    return this.http.get(`${this.uri}`);
  }

  getsaleOrderById(id) {
    return this.http.get(`${this.uri}/${id}`);
  }

  addSaleOrder(title, customer, salesPerson, total, invoiceStatus) {
    const saleOrder = {
      title: title,
      customer: customer,
      salesPerson: salesPerson,
      total: total,
      invoiceStatus: invoiceStatus
    };

    return this.http.post(`${this.uri}/add`, saleOrder);
  }

  updateSaleOrder(id, title, customer, salesPerson, total, invoiceStatus) {
    const saleOrder = {
      title: title,
      customer: customer,
      salesPerson: salesPerson,
      total: total,
      invoiceStatus: invoiceStatus
    };

    return this.http.post(`${this.uri}/update/${id}`, saleOrder);
  }

  deleteSaleOrder(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }
}
