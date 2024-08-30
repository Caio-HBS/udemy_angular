import { Injectable, signal } from "@angular/core";

import { Task, TaskStatus } from "./task.model";

import { LoggingService } from "../logging.service";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  constructor(private loggingService: LoggingService) {}

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: "OPEN",
    };

    this.tasks.update((prevTasks) => [...prevTasks, newTask]);
    this.loggingService.log(`ADDED TASK WITH TITLE: ${taskData.title}`);
  }

  updateTask(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((prevTasks) =>
      prevTasks.map((singleTask) =>
        singleTask.id === taskId
          ? { ...singleTask, status: newStatus }
          : singleTask
      )
    );
    this.loggingService.log(`CHANGED TASK STATUS: ${newStatus}`);
  }
}
