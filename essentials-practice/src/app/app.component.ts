import { Component } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { UserInputComponent } from "./user-input/user-input.component";

@Component({
  selector: "app-root",
  imports: [HeaderComponent, UserInputComponent],
  standalone: true,
  templateUrl: "./app.component.html",
})
export class AppComponent {}
