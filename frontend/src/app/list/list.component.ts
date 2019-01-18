import { Component, OnInit } from '@angular/core';
import { SaleOrder } from '../sale-order-model';
import { SaleOrderService } from '../sale-order.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  saleOrders: SaleOrder[];
  displayedColumns = ['title', 'customer', 'salesPerson', 'total', 'invoiceStatus', 'actions'];

  constructor(private saleOrderService: SaleOrderService, private router: Router) { }

  ngOnInit() {
    this.fetchSaleOrders();
  }

  fetchSaleOrders() {
    this.saleOrderService.getSaleOrders().subscribe((data: SaleOrder[]) => {
      this.saleOrders = data;
      console.log('Data requested...', this.saleOrders);
    });
  }

  editSaleOrder(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteSaleOrder(id) {
    this.saleOrderService.deleteSaleOrder(id).subscribe(()=> {
      this.fetchSaleOrders();
    });
  }

}
