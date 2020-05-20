import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes' , pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent , 
    children: [
      { path: '', component: RecipeStartComponent},
      { path: ':id', component: RecipeDetailComponent}
    ]
  },
  { path: 'shopping-list', canActivate: [AuthGuard], children: [
    { path: '', component: ShoppingListComponent },
    { path: ':id', component: ShoppingEditComponent}
  ]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
