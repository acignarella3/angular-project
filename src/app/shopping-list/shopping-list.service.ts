import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

  constructor() { }

  ingredientsChanged = new Subject<Ingredient[]>();
  editStarted = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ];

  //ingredientArrUpdated = new EventEmitter<Ingredient[]>();

  getIngredients() {
      return this.ingredients.slice();
  }

  getIngredient(index: number) {
      return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      //this.ingredientArrUpdated.emit(this.ingredients.slice());
      this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // WIll work, but results in a lot of unnecessary event emissions
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }

    //The following utilizes what's called a spread operator (...), which automatically turns
    //an array into a list. This is only available through ES6.
    this.ingredients.push(...ingredients);
    
    //this.ingredientArrUpdated.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
