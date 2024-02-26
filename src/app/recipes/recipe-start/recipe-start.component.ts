import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-start",
  templateUrl: "./recipe-start.component.html",
  styleUrls: ["./recipe-start.component.css"],
})
export class RecipeStartComponent implements OnInit {
  recipeExistance = true;
  recipes: Recipe[];

  getRecipes() {
    this.recipes = this.recipeService.getRecipes();

    if (this.recipes.length === 0) {
      this.recipeExistance = false;
    }
  }

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getRecipes();
  }
}
