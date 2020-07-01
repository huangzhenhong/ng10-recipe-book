import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { FormatWidth } from '@angular/common';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    
    let recipeName = '';
    let imageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode) {
      const recipe = this.recipeService.get(this.id);
      recipeName = recipe.name;
      imageUrl = recipe.imagePath;
      recipeDescription = recipe.description;
      
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    
    if(!this.id) {
      this.id = Math.floor(Math.random() * 1000);
    }

    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.value['name'], 
      this.recipeForm.value['description'], 
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);

    if(this.editMode) {
      this.recipeService.update(this.id, newRecipe)
    }else {
      this.recipeService.add(newRecipe);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
