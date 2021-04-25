import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipe] Set Recipes';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const START_UPDATE_RECIPE = '[Recipe] On Update Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const END_UPDATE_RECIPE = '[Recipe] On End Update Recipe';

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]){}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe){}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
}

export class StartUpdateRecipe implements Action {
    readonly type = START_UPDATE_RECIPE;
    constructor(public payload: number) {}
}

export class EndUpdateRecipe implements Action {
    readonly type = END_UPDATE_RECIPE;
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload :Recipe){}
}

export type RecipeActions = 
    | SetRecipes
    | AddRecipe 
    | DeleteRecipe
    | StartUpdateRecipe 
    | UpdateRecipe
    | EndUpdateRecipe;