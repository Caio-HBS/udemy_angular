import { Routes } from "@angular/router";

import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import {
  resolveUsername,
  UserTasksComponent,
} from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  {
    path: "",
    component: NoTaskComponent,
  },
  {
    path: "users/:userId",
    component: UserTasksComponent,
    data: {
      message: "Hello!",
    },
    resolve: {
      username: resolveUsername,
    },
    children: [
      {
        path: "",
        redirectTo: "tasks",
        pathMatch: "prefix",
      },
      {
        path: "tasks",
        component: TasksComponent,
      },
      {
        path: "tasks/new",
        component: NewTaskComponent,
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
