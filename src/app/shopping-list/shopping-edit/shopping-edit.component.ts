import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { CanComponentDeactivate } from '../../shared/guards/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, CanComponentDeactivate {

  @Output() onProductAdded = new EventEmitter<Ingredient>();
  @ViewChild('productInput', {static: false}) productInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }
  
  onAdd() {   
    //console.log(this.productInput);
    var id = 2;
    var name = this.productInput.nativeElement.value;
    var amount = this.amountInput.nativeElement.value;
    this.onProductAdded.emit({id, name, amount});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
