import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../services/shopping-list.service';
import * as shoppingListActions from '../store/shopping-list.actions'; 
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  ingredient: Ingredient = null;
  @ViewChild('f') editForm: NgForm;
  @Output() onProductAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    
    this.subscription = this.store.select('shoppingList').subscribe(
      (data) => {
        if(data.editedIngredientId > -1) {
          this.editMode = true;
          this.ingredient = data.editedIngredient;
          this.editForm.form.patchValue({
            'name': this.ingredient.name,
            'amount': this.ingredient.amount
          });
        }else {
          this.editMode = false;
        }
      }
    );  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    var name = form.value.name;
    var amount = form.value.amount;

    if(this.editMode) {
      this.store.dispatch(new shoppingListActions.UpdateIngredient({...this.ingredient, name, amount}));
    }else {
      var id = Math.floor((Math.random()*10)+1);
      var newIngredient: Ingredient = new Ingredient(id, name, amount);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.editForm.reset();
    this.store.dispatch(new shoppingListActions.EndUpdateIngredient());
  }

  onDelete() {
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onClear();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
