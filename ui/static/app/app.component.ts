import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ROUTER_DIRECTIVES, Route, Router, RouteConfig } from "@angular/router-deprecated";
import { AuthService } from "./auth/auth.service";
import { ConfigService } from "./config.service";
import { DomainComponent } from "./domain/domain.component";
import { LoginComponent } from "./auth/login.component";
import { LogoutComponent } from "./auth/logout.component";
import { RecordComponent } from "./record/record.component";
import { RecordDetailComponent } from "./record/record-detail.component";
import { RecordRequestComponent } from "./record-request/record-request.component";
import { RecordRequestDetailComponent } from "./record-request/record-request-detail.component";


@Component({
  selector: "dnsaas-app",
  templateUrl: "static/app/app.component.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService],
  styles: [" .main { padding-top:45px; }"]
})
 @RouteConfig([
  { path: "/add-record/", name: "AddRecord", component: RecordDetailComponent },
  { path: "/domains", name: "Domains", component: DomainComponent },
  { path: "/login", name: "Login", component: LoginComponent },
  { path: "/logout", name: "Logout", component: LogoutComponent },
  { path: "/records", name: "Records", component: RecordComponent },
  { path: "/record-detail/:id", name: "RecordDetail", component: RecordDetailComponent },
  { path: "/records-requests", name: "RecordRequests", component: RecordRequestComponent },
  { path: "/request-detail/:id", name: "RecordRequestDetail", component: RecordRequestDetailComponent },
])
export class AppComponent implements OnInit {

  homeUrl: string = ConfigService.get("homeUrl");

  constructor(
    public router: Router,
    public location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["Login"]);
    } else if (this.location.path().length === 0) {
      this.router.navigate(["Records"]);
    }
  }

  get isLoggedIn(): Boolean {
    return this.authService.isLoggedIn();
  }

  get username(): string {
    return this.authService.getUsername();
  }
}
