import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_UPDATE_INGREDIENT = '[Shopping List] On Update Ingredient';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const END_UPDATE_INGREDIENT = '[Shopping List] On End Update Ingredient';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient){}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartUpdateIngredient implements Action {
    readonly type = START_UPDATE_INGREDIENT;
    constructor(public payload: number) {}
}

export class EndUpdateIngredient implements Action {
    readonly type = END_UPDATE_INGREDIENT;
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload :Ingredient){}
}

export type ShoppingListActions = 
    | AddIngredient 
    | DeleteIngredient
    | StartUpdateIngredient 
    | UpdateIngredient
    | EndUpdateIngredient;