import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('form') slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editIndex: number;
  editItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.editStarted.subscribe(
      (index: number) => {
        this.editIndex = index;
        this.editMode = true;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    // const name = this.nameInput.nativeElement.value;
    // const amount = this.amountInput.nativeElement.value;

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editIndex);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

}
