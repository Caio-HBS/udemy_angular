import { Component, computed, inject, input } from "@angular/core";

import { TasksService } from "./tasks.service";

import { TaskComponent } from "./task/task.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-tasks",
  standalone: true,
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.css",
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  private tasksService = inject(TasksService);

  sort = input<"asc" | "desc">();
  userId = input.required<string>();

  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.sort() === "desc") {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      })
  );
}
