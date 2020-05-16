import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Test Recipe 1', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
  ];

  @Output() onSelect = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    this.recipes.push({name: 'New Server', description: 'This is a new server', imagePath: ''});
  }

  onRecipeSelected(event: any) {
    this.onSelect.emit(event);
  }
                                    
}
