import { Component, computed, inject } from "@angular/core";
import { NgIf } from "@angular/common";

import { AuthService } from "./auth/auth.service";

import { AuthDirective } from "./auth/auth.directive";

import { AuthComponent } from "./auth/auth.component";
import { LearningResourcesComponent } from "./learning-resources/learning-resources.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [AuthComponent, LearningResourcesComponent, NgIf, AuthDirective],
})
export class AppComponent {
  private authService = inject(AuthService);

  isAdmin = computed(() => this.authService.activePermission() === "admin");
}
