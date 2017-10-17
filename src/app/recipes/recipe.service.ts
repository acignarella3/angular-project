import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  constructor(private slService: ShoppingListService) { }

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
      new Recipe('Penne Vodka',
          'The bestest pasta',
          'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/10/4/0/FNM_110110-Weeknight-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382539738027.jpeg',
          [
              new Ingredient('Pasta', 30),
              new Ingredient('Vodka Sauce', 1)
          ]),
      new Recipe('Eggs Benedict',
          'A really good breakfast',
          'https://upload.wikimedia.org/wikipedia/commons/6/6f/Eggs_Benedict-01-cropped.jpg',
          [
              new Ingredient('Eggs', 2),
              new Ingredient('Canadian Bacon', 2),
              new Ingredient('English Muffin', 1),
              new Ingredient('Hollandaise Sauce', 1)
          ])
  ];

  //recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
