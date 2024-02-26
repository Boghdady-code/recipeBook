import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  selectedRecipe = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Wiener Schnitzel",
  //     "The Wiener Schnitzel is the classic Viennese cutlet, typical of Austrian cuisine but also widespread in South Tyrol and Tyrol.",
  //     "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/05/thumb-1200x675.jpg",
  //     [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
  //   ),
  //   new Recipe(
  //     "Cheese Burger",
  //     "Salty, buttery, and slightly sharp, Comté cheese crisps similarly to Parmesan, adding an irresistibly crunchy frico layer to these cheeseburgers. For best results",
  //     "https://www.foodandwine.com/thmb/jldKZBYIoXJWXodRE9ut87K8Mag=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
  //     [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  constructor(private shoppingListService: ShoppingListService) {}
}
