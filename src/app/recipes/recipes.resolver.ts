import { Recipe } from "./recipe.model";
import { DataStoreService } from "../shared/data-store.service";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStoreService: DataStoreService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStoreService.fetchData();
    } else {
      return recipes;
    }
  }
}
