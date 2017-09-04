import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient() {
      const name = this.nameInput.nativeElement.value;
      const amount = this.amountInput.nativeElement.value;

      const newIngredient = new Ingredient(name, amount);

      this.slService.addIngredient(newIngredient);
  }

}
