import { Effect, Actions, ofType } from '@ngrx/effects';
import * as recipeActions from '../store/recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(recipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>("https://my-recipe-book-50a13.firebaseio.com/recipes.json")
        }),
        map(recipes => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []}; 
          })
        }),
        map(recipes => {
            return new recipeActions.SetRecipes(recipes);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient){}
}