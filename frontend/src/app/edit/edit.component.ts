import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { SaleOrderService } from '../sale-order.service';

import {SaleOrder } from '../sale-order-model'; 
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: String;
  saleOrder: any ={};
  editForm: FormGroup;

  constructor(
    private saleOrderService: SaleOrderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.creatForm();  
  }

  creatForm() {
    this.editForm = this.fb.group ({
      title: ['', Validators.required],
      customer: '',
      salesPerson: ['', Validators.required],
      total: '',
      invoiceStatus: '',
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.saleOrderService.getsaleOrderById(this.id).subscribe(res => {
        this.saleOrder = res;
        this.editForm.get('title').setValue(this.saleOrder.title);
        this.editForm.get('customer').setValue(this.saleOrder.customer);
        this.editForm.get('salesPerson').setValue(this.saleOrder.salesPerson);
        this.editForm.get('total').setValue(this.saleOrder.total);
        this.editForm.get('invoiceStatus').setValue(this.saleOrder.invoiceStatus);
      });
    });
  }

  editSaleOrder(title, customer, salesPerson, total, invoiceStatus) {
    this.saleOrderService.updateSaleOrder(this.id, title, customer, salesPerson, total, invoiceStatus).subscribe(()=> {
      this.snackBar.open('Sale Order Updated Successfully...!', 'OK', {
        duration: 3000
      });
    });
  }

}
