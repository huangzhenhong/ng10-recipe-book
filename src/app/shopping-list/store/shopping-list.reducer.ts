import { Action } from '@ngrx/store';
import { Ingredient } from "../../shared/models/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientId: number
}

const initialState: State = {
    ingredients: [
        new Ingredient(1, 'Apple', 5),
        new Ingredient(2, 'Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientId: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            {
                return {
                    ...state,
                    ingredients: state.ingredients.filter(i => {
                        return i.id !== state.editedIngredientId;
                    }),
                    editedIngredient: null,
                    editedIngredientId: -1
                };
            }
        case ShoppingListActions.START_UPDATE_INGREDIENT:
        {
            var ingredient = state.ingredients.find(i => i.id === action.payload);
            return {
                ...state,
                editedIngredient: ingredient,
                editedIngredientId: action.payload
            }
        }
        case ShoppingListActions.UPDATE_INGREDIENT:
        {
            var ingredients = [...state.ingredients];
            let index = ingredients.findIndex(x => x.id === action.payload.id);
            ingredients[index] = action.payload;
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientId: -1
            };
        }
        case ShoppingListActions.END_UPDATE_INGREDIENT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientId: -1
            }
        default: 
            return state;
    }
}