import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Subject  } from 'rxjs';
import { DbService } from '../../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private dbService: DbService) { }

  get(id: number) {
    return this.recipes.find(x => x.id === id);
  }

  getAllRecipes(){
    console.log("start fetching data ...")
    this.dbService.fetchData()
    .subscribe(
      (data: Recipe[]) => {
        if(data) {
          this.recipes = data;
          this.recipesChanged.next(this.recipes.slice());
          console.log(this.recipes);
        }
      }, 
      error => {
        console.log(error.message);
      }
    );
  }

  add(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  update(id: number, newRecipe: Recipe) {
    var index = this.recipes.findIndex(x => x.id === id);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  delete(id: number) {
    var index = this.recipes.findIndex(x => x.id === id);
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  saveRecipes() {
    //console.log(this.recipes.slice());
    this.dbService.saveData(this.recipes.slice())
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
}
