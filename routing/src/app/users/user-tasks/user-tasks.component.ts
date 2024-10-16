import { Component, inject, input } from "@angular/core";

import { UsersService } from "../users.service";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from "@angular/router";

@Component({
  selector: "app-user-tasks",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./user-tasks.component.html",
  styleUrl: "./user-tasks.component.css",
})
export class UserTasksComponent {
  username = input.required<string>();

  message = input.required<string>();
}

export const resolveUsername: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const username =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get("userId")
    )?.name || "";

  return username;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUsername(activatedRoute, routerState) + "'s Tasks";
};
