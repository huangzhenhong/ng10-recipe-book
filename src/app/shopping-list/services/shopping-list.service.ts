import { Injectable } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient(1, 'Apple', 5),
    new Ingredient(2, 'Tomatoes', 10)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  add(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(ingredient: Ingredient) {

    let index = this.ingredients.findIndex(x => x.id === ingredient.id);
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    let index = this.ingredients.findIndex(x => x.id === id);
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(id: number){
    return this.ingredients.find(x => x.id === id);
  }
}
