import { PlaceholderDirective } from "./../shared/placeholder.directive";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error = null;
  constructor(private auth: AuthService, private router: Router) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode === true) {
      this.auth.login(form.value.email, form.value.password).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(["/recipes"]);
        },
        (errorMessage) => {
          // this.error = errorMessage;
          this.createErrorConponent(errorMessage);

          this.isLoading = false;
        }
      );
    } else {
      this.auth.signUp(form.value.email, form.value.password).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(["/recipes"]);
        },
        (errorMessage) => {
          // this.error = errorMessage;

          this.createErrorConponent(errorMessage);

          this.isLoading = false;
        }
      );
    }

    // console.log(form.value);
    form.reset();
  }

  private createErrorConponent(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;

    componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
  }

  ngOnInit(): void {}
}
