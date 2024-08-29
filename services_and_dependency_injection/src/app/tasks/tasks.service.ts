import { Injectable, signal } from "@angular/core";

import { Task, TaskStatus } from "./task.model";
import { single } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: "OPEN",
    };

    this.tasks.update((prevTasks) => [...prevTasks, newTask]);
  }

  updateTask(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((prevTasks) =>
      prevTasks.map((singleTask) =>
        singleTask.id === taskId
          ? { ...singleTask, status: newStatus }
          : singleTask
      )
    );
  }
}
