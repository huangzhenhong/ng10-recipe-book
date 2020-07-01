import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DbService) { 

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.dataStorageService.fetchData();
  }
}
