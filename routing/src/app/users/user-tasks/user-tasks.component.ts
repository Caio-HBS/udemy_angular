import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from "@angular/core";

import { UsersService } from "../users.service";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-user-tasks",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./user-tasks.component.html",
  styleUrl: "./user-tasks.component.css",
})
export class UserTasksComponent implements OnInit {
  username = "";
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.username =
          this.usersService.users.find((u) => u.id === paramMap.get("userId"))
            ?.name || "";
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
