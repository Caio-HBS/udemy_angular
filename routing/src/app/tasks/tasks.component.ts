import { Component, computed, inject, input } from "@angular/core";

import { TasksService } from "./tasks.service";

import { TaskComponent } from "./task/task.component";

@Component({
  selector: "app-tasks",
  standalone: true,
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.css",
  imports: [TaskComponent],
})
export class TasksComponent {
  private tasksService = inject(TasksService);

  userId = input.required<string>();

  userTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId())
  );
}
