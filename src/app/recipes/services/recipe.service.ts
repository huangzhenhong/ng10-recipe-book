import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Pizza', 
      'Test Recipe 1 - awesome!', 
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg', 
      [
        new Ingredient(2, 'shrip', 10),
        new Ingredient(3, 'pepper', 4)
      ]),
  ];

  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() { }

  get(id: number) {
    return this.recipes.find(x => x.id === id);
    //return this.recipes[id];
  }

  getAllRecipes(){
    return this.recipes;
  }

  add(recipe: Recipe) {
    this.recipes.push(recipe);
  }
}
