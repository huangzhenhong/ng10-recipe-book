import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient(1, 'Apple', 5),
    new Ingredient(2, 'Tomatoes', 10)
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  add(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
