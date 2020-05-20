import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipes = this.recipeService.getAllRecipes();
  }

  onAdd(){
    this.recipeService.add({id: 2, name: 'New Server', description: 'This is a new server', imagePath: '', ingredients: []});
    this.loadRecipes();
  }
                
}
