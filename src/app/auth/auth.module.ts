import { sharedModule } from "./../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule, sharedModule, AuthRoutingModule],
})
export class AuthModule {}
