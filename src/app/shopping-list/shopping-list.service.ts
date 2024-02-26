import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  constructor() {}
  selectedIngredient = new Subject<Ingredient>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients;
  }

  getSelectedIngerdient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.selectedIngredient.next(ingredient);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    console.log(this.ingredients[index]);

    this.ingredients[index] = newIngredient;

    this.selectedIngredient.next(this.ingredients[index]);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }
}
