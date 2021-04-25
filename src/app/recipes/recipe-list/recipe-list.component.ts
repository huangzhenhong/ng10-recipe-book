import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as recipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeSub: Subscription;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>) { 

    }

  ngOnInit(): void {
    this.recipeSub = this.store.select('recipes')
    .subscribe(data => {
      this.recipes = data.recipes;
    });
  }

  ngOnDestroy(): void {
    if(this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
                
}
