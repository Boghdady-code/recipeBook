import { AuthModule } from "./../auth/auth.module";
import { sharedModule } from "./../shared/shared.module";
import { ShoppingListRouting } from "./shopping-list.routing";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [sharedModule, FormsModule, ShoppingListRouting],
})
export class ShoppingListModule {}
