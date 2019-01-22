import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaleOrderService } from '../sale-order.service';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creatForm: FormGroup;

  constructor(
    private saleOrderService: SaleOrderService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) {
        this.creatForm = this.fb.group({
          title: ['', Validators.required],
          customer: '',
          salesPerson: ['', Validators.required],
          total: '',
          invoiceStatus: '',
        });
    }

  addSaleOrder(title, customer, salesPerson, total, invoiceStatus) {
    this.saleOrderService.addSaleOrder(title, customer, salesPerson, total, invoiceStatus).subscribe(()=> {
      this.router.navigate(['/list']);
    });
    this.snackBar.open('Sale Order Created Successfully...!', 'OK', {
      duration: 3000
    });
  }

  ngOnInit() {
  }

}
