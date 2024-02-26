import { Subscription } from "rxjs";
import { AuthService } from "./../auth/auth.service";
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { DataStoreService } from "../shared/data-store.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(
    private dataStoreService: DataStoreService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.auth.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  onSaveData() {
    this.dataStoreService.sendData();
  }

  onFetchData() {
    this.dataStoreService.fetchData().subscribe();
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
