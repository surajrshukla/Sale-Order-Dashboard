import { Component, OnInit } from '@angular/core';
import { SaleOrderService } from '../sale-order.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private saleOrderService: SaleOrderService) { }

  ngOnInit() {
  }

}
