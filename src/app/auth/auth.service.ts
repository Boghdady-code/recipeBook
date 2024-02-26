import { environment } from "./../../environments/environment";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  signUp(email: string, password: string) {
    const formInput = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<any>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?${environment.firebaseApiKey}`,
        formInput
      )
      .pipe(
        catchError(this.errorHandle),
        tap((resData) => {
          this.authHandle(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    const formInput = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<any>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        formInput
      )
      .pipe(
        catchError(this.errorHandle),
        tap((resData) => {
          this.authHandle(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private authHandle(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expireDate);
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private errorHandle(error: HttpErrorResponse) {
    let errorMessage = "An unknown error occured";
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage =
          "The email address is already in use by another account.";
        break;

      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "Email address or Password is invalid.";
        break;
    }
    return throwError(errorMessage);
  }
}
