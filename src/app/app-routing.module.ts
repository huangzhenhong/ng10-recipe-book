import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PipeServersComponent } from './demos/pipe-servers/pipe-servers.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes' , pathMatch: 'full' },
  //{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
