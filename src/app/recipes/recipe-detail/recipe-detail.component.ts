import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      if(params['id']) {
        let id = +params['id'];
        this.recipe = this.recipeService.get(id);
      }
    });
  }

  onAdd() {
    for(let ingredient of this.recipe.ingredients) {
      this.shoppingListService.add(ingredient);
    }
  }
}
