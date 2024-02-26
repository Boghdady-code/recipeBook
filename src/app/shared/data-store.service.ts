import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStoreService {
  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private Auth: AuthService
  ) {}

  sendData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://recipebook-106bf-default-rtdb.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        `https://recipebook-106bf-default-rtdb.firebaseio.com/recipes.json`
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: any) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
