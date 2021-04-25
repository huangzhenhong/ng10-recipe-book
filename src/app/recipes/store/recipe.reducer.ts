import { Recipe } from "../recipe.model";
import * as recipeAction from './recipe.actions';

export interface State {
    recipes: Recipe[],
    editedRecipe: Recipe,
    editedRecipeId: number
}

const initialState: State = {
    recipes: [],
    editedRecipe: null,
    editedRecipeId: -1
};

export function recipeReducer(state: State = initialState, action: recipeAction.RecipeActions) {
    switch(action.type) {
        case recipeAction.SET_RECIPES: 
            return {
                ...state,
                recipes: [...action.payload]
            };
        case recipeAction.ADD_RECIPE: 
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case recipeAction.DELETE_RECIPE:
            {
                return {
                    ...state,
                    recipes: state.recipes.filter(i => {
                        return i.id !== state.editedRecipeId;
                    }),
                    editedRecipe: null,
                    editedRecipeId: -1
                };
            }
        case recipeAction.START_UPDATE_RECIPE:
        {
            var recipe = state.recipes.find(i => i.id === action.payload);
            return {
                ...state,
                editedRecipe: recipe,
                editedRecipeId: action.payload
            }
        }
        case recipeAction.UPDATE_RECIPE:
        {
            var recipes = [...state.recipes];
            let index = recipes.findIndex(x => x.id === action.payload.id);
            recipes[index] = action.payload;
            return {
                ...state,
                recipes: recipes,
                editedRecipe: null,
                editedRecipeId: -1
            };
        }
        case recipeAction.END_UPDATE_RECIPE:
            return {
                ...state,
                editedRecipe: null,
                editedRecipeId: -1
            }
        default: 
            return state;
    }

}