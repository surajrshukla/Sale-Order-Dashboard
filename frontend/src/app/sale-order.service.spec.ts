import { TestBed } from '@angular/core/testing';

import { SaleOrderService } from './sale-order.service';

describe('SaleOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleOrderService = TestBed.get(SaleOrderService);
    expect(service).toBeTruthy();
  });
});
