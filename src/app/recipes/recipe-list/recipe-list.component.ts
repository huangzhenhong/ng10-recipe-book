import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipesChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute, 
    private router: Router) { 

    }

  ngOnInit(): void {
    this.recipesChangedSubscription = this.recipeService.recipesChanged
    .subscribe((recipes) => {
      this.recipes = recipes;
    });
    
    this.loadRecipes();
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }

  loadRecipes() {
    this.recipeService.getAllRecipes();
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
                
}
