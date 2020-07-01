import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { CanComponentDeactivate } from '../../shared/guards/can-deactivate-guard.service';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  ingredient: Ingredient;
  @ViewChild('f') editForm: NgForm;
  @Output() onProductAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        if(id) {
          this.ingredient = this.shoppingListService.getIngredient(id);
          //console.log(this.ingredient);
          this.editForm.form.patchValue({
            'name': this.ingredient.name,
            'amount': this.ingredient.amount
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    //console.log(form);
    var name = form.value.name;
    var amount = form.value.amount;

    if(this.editMode) {
      this.ingredient.name = name;
      this.ingredient.amount = amount;
      this.shoppingListService.updateIngredient(this.ingredient);
    }else {
      var id = Math.floor((Math.random()*10)+1);
      this.onProductAdded.emit({id, name, amount});
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.editForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingredient.id);
    this.onClear();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
