import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchData() {
    
      return this.http.get<Recipe[]>("https://my-recipe-book-50a13.firebaseio.com/recipes.json")
        .pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []}; 
          });
        })
      );
  }

  saveData(recipes: Recipe[]) {
    return this.http.put<Recipe[]>("https://my-recipe-book-50a13.firebaseio.com/recipes.json", recipes);
  }
}
