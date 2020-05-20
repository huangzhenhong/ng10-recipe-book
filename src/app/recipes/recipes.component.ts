import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { LoggingService } from '../shared/services/logging.service';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
